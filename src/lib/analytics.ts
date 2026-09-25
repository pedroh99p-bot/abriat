export type AnalyticsEvent =
  | 'page_view'
  | 'hero_slide_view'
  | 'hero_slide_click'
  | 'quiz_start'
  | 'quiz_step_complete'
  | 'quiz_submit'
  | 'whatsapp_click'
  | 'founder_instagram_click'
  | 'benefits_interaction'
  | 'profile_interaction'
  | 'faq_open'
  | 'assistant_open'
  | 'assistant_action'

export function track(event: AnalyticsEvent, parameters: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event, ...parameters })
}

export function getDataLayer() {
  if (typeof window === 'undefined') return []
  return window.dataLayer ?? []
}
