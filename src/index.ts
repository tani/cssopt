import { fromParse5 } from "hast-util-from-parse5"
import { selectAll } from "hast-util-select"
import parse5 from "parse5"
import css from "css"

function inline(html: string, stylesheet: string) {
    const past = parse5.parseFragment(html)
    const hast = fromParse5(past)
    const cast = css.parse(stylesheet)
    for (const rule of cast.stylesheet.rules) {
        rule.type == ""
    }
    const elems = selectAll('', hast)
}