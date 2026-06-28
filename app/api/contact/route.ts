const TELEGRAM_API_BASE = 'https://api.telegram.org'

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function formatTelegramMessage(data: {
  name: string
  lastname: string
  phone: string
  message: string
}) {
  const fullName = [data.name, data.lastname].filter(Boolean).join(' ')

  return [
    '<b>📩 Yangi ariza keldi!</b>',
    `<b>👤 Ism:</b> ${escapeHtml(fullName || '-')}`,
    `<b>📞 Telefon:</b> ${escapeHtml(data.phone)}`,
    '<b>💬 Xabar:</b>',
    escapeHtml(data.message || '-'),
  ].join('\n')
}

export async function POST(request: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    return Response.json(
      {
        error: 'Telegram bot token or chat id is not configured.',
        details:
          'Botga /start yuboring va .env.local ichidagi TELEGRAM_CHAT_ID ga shaxsiy chat id ni yozing.',
      },
      { status: 500 },
    )
  }

  const formData = await request.formData()
  const name = getFormValue(formData, 'name')
  const lastname = getFormValue(formData, 'lastname')
  const phone = getFormValue(formData, 'phone')
  const message = getFormValue(formData, 'message')

  if (!name || !phone) {
    return Response.json(
      { error: 'Name and phone are required.' },
      { status: 400 },
    )
  }

  const telegramResponse = await fetch(
    `${TELEGRAM_API_BASE}/bot${botToken}/sendMessage`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatTelegramMessage({ name, lastname, phone, message }),
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    },
  )

  const telegramResult = await telegramResponse.json().catch(() => null)

  if (!telegramResponse.ok) {
    return Response.json(
      {
        error: 'Telegram message could not be sent.',
        details:
          telegramResult &&
          typeof telegramResult === 'object' &&
          'description' in telegramResult
            ? String(telegramResult.description)
            : `Telegram returned ${telegramResponse.status}`,
      },
      { status: 502 },
    )
  }

  return Response.json({ ok: true })
}
