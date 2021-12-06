// MIT, 2021 (c) TANIGUCHI Masaya
import { selectAll, HastNode } from "hast-util-select"
import { toString } from "hast-util-to-string";
import css from "css"
import { remove } from "unist-util-remove"

export function inline(hast: HastNode): HastNode | null {
    const stylesheet = selectAll('style', hast).map(toString).join("\n")
    const cast = css.parse(stylesheet)
    for (const rule of cast.stylesheet?.rules ?? []) {
        if ("selectors" in rule) {
            for(const selector of rule.selectors ?? []) {
                const elems = selectAll(selector, hast)
                for(const elem of elems) {
                    for(const declaration of rule.declarations ?? []) {
                        if("property" in declaration) {
                            elem.properties ??= {}
                            elem.properties.style ??= ""
                            if(/[^;]\s*$/.test(elem.properties.style as string)) {
                                elem.properties.style += ";"
                            }
                            elem.properties.style += `${declaration.property}:${declaration.value};`
                        }
                    }
                }
            }
        }
    }
    
    return remove(hast, { tagName: "style" })
}