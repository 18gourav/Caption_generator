function PageHeader({
    h1 = 'hello',
    h2 = 'subheader'
}) {
    return(
        <div className="flex flex-col items-center mt-15">
        <h1 className="text-3xl" style={{textShadow: "1px 1px 0 rgba(0,0,0,.2)"}}>{h1}</h1>
        <h2 className="text-white/80">{h2}</h2>
      </div>
    )
}

export default PageHeader;