name: wholesale-training
tier: clients
hosting: cloudflare
audience: any-wholesale
data_isolation: shared-view
data_source: na
storage: open
data_touched: Wholesale barista training sign-up submissions (business name, contact name, email, phone, seat count 1-8, timeslot ranking, notes). Submissions POST to a Google Apps Script web app that appends them to the "Training Requests" tab of the Training Requests Google Sheet (ID 1LrKa_un2EmTS6znlAnLQrLXJj5REkjhFJp5dWBXyvwk) and emails Jonathan (jonathan@atomicroastery.com). The Sheet stays the system-of-record — coordinate-training and schedule-training skills read it.
owner: John Corredor <john.corredor@atomicroastery.com>
description: Roastery barista training request form for wholesale partners (sessions held at the Peabody, MA roastery).
url: https://wholesale-training-ext.acr-ops.com
pages_project: wholesale-training
drive_folder: https://drive.google.com/drive/folders/1qxmuCm4fPBi3SRcZ8Zur8uv7Bi6iI1Na
status: staff-preview (deployed 2026-07-01; awaiting Brendan/Spencer approval to flip external)
