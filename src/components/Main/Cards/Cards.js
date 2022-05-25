import Detail from "./Detail/Detail";
import SummaryCards from "./SummaryCards/SummaryCards";

function Cards({location, userLang}) {

    return (
        <div className="flex flex-col lg:grid lg:grid-rows-2 mx-auto gap-2 w-11/12 md lg:h-[calc(screen-1rem)]">
            <Detail  location={location}/>
            <SummaryCards location={location} userLang={userLang}/>
        </div>
    )
}

export default Cards;