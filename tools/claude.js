'use strict'

const fs = require('fs')
const path = require('path')

// Load .env manually — dotenvx can intercept require('dotenv') and inject 0 vars
try {
  const envPath = path.resolve(__dirname, '..', '.env')
  const lines = fs.readFileSync(envPath, 'utf8').split('\n')
  for (const line of lines) {
    const m = line.match(/^\s*([^#=\s][^=]*?)\s*=\s*(.+)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim()
  }
} catch {}

async function callClaude(system, user, maxTokens = 4000) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set in environment')

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Claude API error ${response.status}: ${text}`)
  }

  const data = await response.json()
  if (data.type === 'error') throw new Error(data.error.message)

  const textBlock = data.content.find(c => c.type === 'text')
  if (!textBlock) throw new Error('No text in Claude response')
  return textBlock.text
}

function extractJSON(text) {
  // Try to find JSON object or array
  const objMatch = text.match(/\{[\s\S]*\}/)
  if (objMatch) {
    try { return JSON.parse(objMatch[0]) } catch {}
  }
  const arrMatch = text.match(/\[[\s\S]*\]/)
  if (arrMatch) {
    try { return JSON.parse(arrMatch[0]) } catch {}
  }
  throw new Error(`No valid JSON found in response:\n${text.slice(0, 500)}`)
}

module.exports = { callClaude, extractJSON }
