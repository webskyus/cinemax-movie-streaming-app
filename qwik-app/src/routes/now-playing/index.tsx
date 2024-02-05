import {component$} from "@builder.io/qwik";
import {ContentList} from "~/components/content-list";
import {CATEGORY} from "~/components/ui/label";
import {HeadBanner} from "~/components/head-banner";

export default component$(() => {
    return <section class={"text-white pb-[96px]"}>
        {/*POPULAR TV BANNER*/}
        <HeadBanner type={CATEGORY.MOVIE}/>

        {/*MOVIES*/}
        <ContentList type={CATEGORY.NOW_PLAYING} page={3}/>
    </section>
})
