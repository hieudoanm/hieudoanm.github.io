package io.github.hieudoanm.landify.render

import io.github.hieudoanm.landify.color.themeCss
import io.github.hieudoanm.landify.color.tokens
import io.github.hieudoanm.landify.config.Config
import io.github.hieudoanm.landify.config.merged
import io.github.hieudoanm.landify.template.RenderContext
import io.github.hieudoanm.landify.template.TemplateEngine
import io.github.hieudoanm.landify.validate.renderType
import kotlinx.serialization.json.Json

/**
 * Marks where the derived `:root` custom properties are spliced in.
 *
 * The slot is static text inside the template's `<style>` block so the engine
 * copies it through untouched. Go needed the same trick because
 * `html/template`'s CSS value filter would mangle a raw block; here the
 * template engine has no CSS context at all, but the ordering is kept so the
 * output stays byte-identical.
 */
const val THEME_SLOT = "@LANDIFY_THEME@"

/**
 * Encodes defaults so every key in the context tree holds its real value.
 *
 * Without this a field that happens to equal its model default would be
 * omitted and resolve to null instead of an empty string, which is a
 * distinction the templates can observe.
 */
private val json = Json { encodeDefaults = true }

/**
 * Renders the landing page for [config].
 *
 * The page type selects the template, with unknown types falling back to
 * `product`. Theme colors are merged from the defaults first so a config built
 * in code (rather than decoded from YAML) still renders.
 *
 * @throws IllegalArgumentException when a theme color is not `#RRGGBB`.
 * @throws IllegalStateException when an embedded template is missing.
 */
fun render(config: Config): String {
    val engine = TemplateEngine(Assets.sources())
    val context = RenderContext(json.encodeToJsonElement(Config.serializer(), config))
    val html = engine.render("template-${renderType(config.pageType)}.j2", context)
    return html.replace(THEME_SLOT, themeCss(tokens(config.theme.merged())))
}
