import {component$, Resource, useResource$} from "@builder.io/qwik";
import {Loader} from "~/components/ui/loader";
import {CATEGORY} from "~/components/ui/label";
import {API, API_REQUEST_URLS} from "~/api";
import {Cast} from "~/api/models";
import {useLocation} from "@builder.io/qwik-city";
import {ContentCardXL} from "~/components/contend-card-xl";
import {EmptyMessage} from "~/components/ui/empty-message";
import {ErrorMessage} from "~/components/ui/error-message";

type CreditListType = CATEGORY.MOVIE | CATEGORY.TV_SHOW;

type CastListTypeProps = {
    API: API_REQUEST_URLS,
    TITLE: CATEGORY
}

interface CreditListProps {
    type: CreditListType
}

const CREDIT_TYPE: Record<CreditListType, CastListTypeProps> = {
    [CATEGORY.MOVIE]: {
        API: API_REQUEST_URLS.CREDIT_MOVIE,
        TITLE: CATEGORY.CREDITS_MOVIE
    },
    [CATEGORY.TV_SHOW]: {
        API: API_REQUEST_URLS.CREDIT_TV,
        TITLE: CATEGORY.CREDITS_TV_SHOW
    }
}

export const CreditList = component$((props: CreditListProps) => {
    const {params} = useLocation();
    const {type} = props;
    const apiRequestUrl = CREDIT_TYPE[type].API;
    const pageTitle = CREDIT_TYPE[type].TITLE;

    const creditList = useResource$(async ({track}) => {
        track(() => params.id);

        const res = await fetch(`${API.URL}/${apiRequestUrl}/${params.id}/${API_REQUEST_URLS.CREDITS}`, API.OPTIONS);
        const json = await res.json();

        return json.cast as Cast[];
    });

    return <section class={`pt-[24px] pb-[24px]`}>
        <nav class={`
            flex items-center justify-between  
            mb-[12px] 
        `}>
            <h2 class={`
                    pb-[12px] 
                    font-bold text-h3-sm sm:text-h3-lg
                    text-transparent bg-clip-text bg-gradient-to-br from-primary to-grayscale-70
                `}>
                {pageTitle}
            </h2>
        </nav>

       <section class={`relative min-h-[350px]`}>
           <Resource value={creditList}
                     onResolved={(casts) => {
                         const rows = Math.round(casts?.length) / 4;

                         return <section class={`
                                       grid grid-cols-2 sm:grid-cols-4 grid-rows-${rows} gap-2
                                      
                                       
                                       [@media(min-width:1600px)]:grid-cols-5
                                       [@media(min-width:1919px)]:grid-cols-6
                                       [@media(min-width:2419px)]:grid-cols-8
                                       [@media(min-width:2619px)]:grid-cols-9
                                       [@media(min-width:3000px)]:grid-cols-10
                                `}>
                             {
                                casts?.length
                                 ?  casts.map((cast) => {
                                        return <ContentCardXL data={cast} type={CATEGORY.PEOPLE} key={cast.id}/>
                                    })
                                    : <EmptyMessage />
                             }
                         </section>
                     }}
                     onPending={() => <Loader isVisible={true}/>}
                     onRejected={() => <ErrorMessage isVisible={true}/>}
           />
       </section>

    </section>
})
