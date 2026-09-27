# Analytics

Eventos são publicados em `window.dataLayer` sem IDs reais de GTM/GA4/Meta.

| Evento | Disparo |
| --- | --- |
| `page_view` | montagem da landing |
| `hero_slide_view` | primeira visualização de cada slide |
| `hero_slide_click` | CTA do slide ou associação contextual |
| `quiz_start` | primeiro foco no formulário |
| `quiz_submit` | validação do formulário e preparação da mensagem inicial |
| `whatsapp_click` | clique para revisar e enviar a mensagem pelo WhatsApp |
| `founder_instagram_click` | reservado ao link oficial, ainda ausente |
| `benefits_interaction` | primeiro gesto no carrossel |
| `profile_interaction` | troca de perfil |
| `faq_open` | abertura de pergunta |
| `assistant_open` | abertura do assistente |
| `assistant_action` | seleção de resposta predefinida |

Nunca incluir nome, telefone, cidade, credencial ou texto livre nos eventos.
