import { ComponentType, lazy } from 'react';

const loadwrite_ai_detector = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/misc/WriteAiDetectorModal').then(
    (m) => ({ default: m.WriteAiDetectorModal })
  );
const loadwrite_article = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/article/WriteArticleModal').then(
    (m) => ({ default: m.WriteArticleModal })
  );
const loadwrite_article_rewriter = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/article/WriteArticleRewriterModal').then(
    (m) => ({ default: m.WriteArticleRewriterModal })
  );
const loadwrite_bill_of_sale = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/business/WriteBillOfSaleModal').then(
    (m) => ({ default: m.WriteBillOfSaleModal })
  );
const loadwrite_blog_ideas = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/article/WriteBlogIdeasModal').then(
    (m) => ({ default: m.WriteBlogIdeasModal })
  );
const loadwrite_blog_outline = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/article/WriteBlogOutlineModal').then(
    (m) => ({ default: m.WriteBlogOutlineModal })
  );
const loadwrite_blog_post = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/article/WriteBlogPostModal').then(
    (m) => ({ default: m.WriteBlogPostModal })
  );
const loadwrite_business_name = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/business/WriteBusinessNameModal').then(
    (m) => ({ default: m.WriteBusinessNameModal })
  );
const loadwrite_business_plan = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/business/WriteBusinessPlanModal').then(
    (m) => ({ default: m.WriteBusinessPlanModal })
  );
const loadwrite_business_slogan = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/business/WriteBusinessSloganModal').then(
    (m) => ({ default: m.WriteBusinessSloganModal })
  );
const loadwrite_caption = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/social/WriteCaptionModal').then(
    (m) => ({ default: m.WriteCaptionModal })
  );
const loadwrite_cold_email = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/business/WriteColdEmailModal').then(
    (m) => ({ default: m.WriteColdEmailModal })
  );
const loadwrite_complete = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteCompleteModal').then(
    (m) => ({ default: m.WriteCompleteModal })
  );
const loadwrite_content_brief = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/content/WriteContentBriefModal').then(
    (m) => ({ default: m.WriteContentBriefModal })
  );
const loadwrite_content_planner = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/content/WriteContentPlannerModal').then(
    (m) => ({ default: m.WriteContentPlannerModal })
  );
const loadwrite_essay = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/article/WriteEssayModal').then(
    (m) => ({ default: m.WriteEssayModal })
  );
const loadwrite_explain = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/misc/WriteExplainModal').then(
    (m) => ({ default: m.WriteExplainModal })
  );
const loadwrite_faq = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/content/WriteFaqModal').then(
    (m) => ({ default: m.WriteFaqModal })
  );
const loadwrite_grammar = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteGrammarModal').then(
    (m) => ({ default: m.WriteGrammarModal })
  );
const loadwrite_headline = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/social/WriteHeadlineModal').then(
    (m) => ({ default: m.WriteHeadlineModal })
  );
const loadwrite_humanizer = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteHumanizerModal').then(
    (m) => ({ default: m.WriteHumanizerModal })
  );
const loadwrite_improve_text = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteImproveTextModal').then(
    (m) => ({ default: m.WriteImproveTextModal })
  );
const loadwrite_landing_page = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/business/WriteLandingPageModal').then(
    (m) => ({ default: m.WriteLandingPageModal })
  );
const loadwrite_linkedin_post = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/social/WriteLinkedInPostModal').then(
    (m) => ({ default: m.WriteLinkedInPostModal })
  );
const loadwrite_listicle = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/article/WriteListicleModal').then(
    (m) => ({ default: m.WriteListicleModal })
  );
const loadwrite_meta_description = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/social/WriteMetaDescriptionModal').then(
    (m) => ({ default: m.WriteMetaDescriptionModal })
  );
const loadwrite_nda = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/business/WriteNdaModal').then(
    (m) => ({ default: m.WriteNdaModal })
  );
const loadwrite_paragraph = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/article/WriteParagraphModal').then(
    (m) => ({ default: m.WriteParagraphModal })
  );
const loadwrite_paraphrase = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteParaphraseModal').then(
    (m) => ({ default: m.WriteParaphraseModal })
  );
const loadwrite_podcast_script = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/business/WritePodcastScriptModal').then(
    (m) => ({ default: m.WritePodcastScriptModal })
  );
const loadwrite_poll = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/content/WritePollModal').then(
    (m) => ({ default: m.WritePollModal })
  );
const loadwrite_press_release = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/business/WritePressReleaseModal').then(
    (m) => ({ default: m.WritePressReleaseModal })
  );
const loadwrite_privacy_policy = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/business/WritePrivacyPolicyModal').then(
    (m) => ({ default: m.WritePrivacyPolicyModal })
  );
const loadwrite_purchase_agreement = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/business/WritePurchaseAgreementModal').then(
    (m) => ({ default: m.WritePurchaseAgreementModal })
  );
const loadwrite_real_estate_bio = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/real-estate/WriteRealEstateBioModal').then(
    (m) => ({ default: m.WriteRealEstateBioModal })
  );
const loadwrite_real_estate_description = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/real-estate/WriteRealEstateDescriptionModal').then(
    (m) => ({ default: m.WriteRealEstateDescriptionModal })
  );
const loadwrite_real_estate_listing = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/real-estate/WriteRealEstateListingModal').then(
    (m) => ({ default: m.WriteRealEstateListingModal })
  );
const loadwrite_rewrite = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteRewriteModal').then(
    (m) => ({ default: m.WriteRewriteModal })
  );
const loadwrite_shorten = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteShortenModal').then(
    (m) => ({ default: m.WriteShortenModal })
  );
const loadwrite_story = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/article/WriteStoryModal').then(
    (m) => ({ default: m.WriteStoryModal })
  );
const loadwrite_story_ideas = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/article/WriteStoryIdeasModal').then(
    (m) => ({ default: m.WriteStoryIdeasModal })
  );
const loadwrite_summarize = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteSummarizeModal').then(
    (m) => ({ default: m.WriteSummarizeModal })
  );
const loadwrite_summarize_podcast = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/misc/WriteSummarizePodcastModal').then(
    (m) => ({ default: m.WriteSummarizePodcastModal })
  );
const loadwrite_summarize_youtube = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/misc/WriteSummarizeYoutubeModal').then(
    (m) => ({ default: m.WriteSummarizeYoutubeModal })
  );
const loadwrite_tiktok_script = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/social/WriteTikTokScriptModal').then(
    (m) => ({ default: m.WriteTikTokScriptModal })
  );
const loadwrite_title = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/misc/WriteTitleModal').then(
    (m) => ({ default: m.WriteTitleModal })
  );
const loadwrite_tone = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteToneModal').then(
    (m) => ({ default: m.WriteToneModal })
  );
const loadwrite_translate = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/edit/WriteTranslateModal').then(
    (m) => ({ default: m.WriteTranslateModal })
  );
const loadwrite_trivia = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/content/WriteTriviaModal').then(
    (m) => ({ default: m.WriteTriviaModal })
  );
const loadwrite_twitter_generator = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/social/WriteTwitterGeneratorModal').then(
    (m) => ({ default: m.WriteTwitterGeneratorModal })
  );
const loadwrite_youtube_script = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/article/WriteYoutubeScriptModal').then(
    (m) => ({ default: m.WriteYoutubeScriptModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'write-ai-detector': loadwrite_ai_detector,
  'write-article': loadwrite_article,
  'write-article-rewriter': loadwrite_article_rewriter,
  'write-bill-of-sale': loadwrite_bill_of_sale,
  'write-blog-ideas': loadwrite_blog_ideas,
  'write-blog-outline': loadwrite_blog_outline,
  'write-blog-post': loadwrite_blog_post,
  'write-business-name': loadwrite_business_name,
  'write-business-plan': loadwrite_business_plan,
  'write-business-slogan': loadwrite_business_slogan,
  'write-caption': loadwrite_caption,
  'write-cold-email': loadwrite_cold_email,
  'write-complete': loadwrite_complete,
  'write-content-brief': loadwrite_content_brief,
  'write-content-planner': loadwrite_content_planner,
  'write-essay': loadwrite_essay,
  'write-explain': loadwrite_explain,
  'write-faq': loadwrite_faq,
  'write-grammar': loadwrite_grammar,
  'write-headline': loadwrite_headline,
  'write-humanizer': loadwrite_humanizer,
  'write-improve-text': loadwrite_improve_text,
  'write-landing-page': loadwrite_landing_page,
  'write-linkedin-post': loadwrite_linkedin_post,
  'write-listicle': loadwrite_listicle,
  'write-meta-description': loadwrite_meta_description,
  'write-nda': loadwrite_nda,
  'write-paragraph': loadwrite_paragraph,
  'write-paraphrase': loadwrite_paraphrase,
  'write-podcast-script': loadwrite_podcast_script,
  'write-poll': loadwrite_poll,
  'write-press-release': loadwrite_press_release,
  'write-privacy-policy': loadwrite_privacy_policy,
  'write-purchase-agreement': loadwrite_purchase_agreement,
  'write-real-estate-bio': loadwrite_real_estate_bio,
  'write-real-estate-description': loadwrite_real_estate_description,
  'write-real-estate-listing': loadwrite_real_estate_listing,
  'write-rewrite': loadwrite_rewrite,
  'write-shorten': loadwrite_shorten,
  'write-story': loadwrite_story,
  'write-story-ideas': loadwrite_story_ideas,
  'write-summarize': loadwrite_summarize,
  'write-summarize-podcast': loadwrite_summarize_podcast,
  'write-summarize-youtube': loadwrite_summarize_youtube,
  'write-tiktok-script': loadwrite_tiktok_script,
  'write-title': loadwrite_title,
  'write-tone': loadwrite_tone,
  'write-translate': loadwrite_translate,
  'write-trivia': loadwrite_trivia,
  'write-twitter-generator': loadwrite_twitter_generator,
  'write-youtube-script': loadwrite_youtube_script,
};
