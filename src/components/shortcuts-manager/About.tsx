import { Fragment } from "react";
import { LANG } from "../../lib/data-structures/Shortcut";

export function About() {
    return (
        <>
        <div>{LANG.ABOUT_ITEM1}</div>
        <div>
            <h3>{LANG.ABOUT_ITEM2}</h3>
            <div>{LANG.ABOUT_ITEM3}</div>
            <div>{LANG.ABOUT_ITEM4}</div>
        </div>
        <br/>
        <div>{LANG.ABOUT_ITEM5}</div>
        <br/>
        <div>{LANG.ABOUT_ITEM6}</div>
        </>
    )
}
