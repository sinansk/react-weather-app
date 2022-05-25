
function Loading() {
    return (
        <div className="w-screen h-screen overflow-hidden bg-transprent grid place-items-center">
            <div className="overflow-hidden text-slate-200 spinner-border animate-spin  w-8 h-8 border-4 rounded-full place-self-center" role="status" />
        </div>
    )
}

export default Loading;