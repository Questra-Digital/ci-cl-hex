const SectionHeader = (props: any) => {
  return (
    <div className={props.className}>
      <div className="space-y-4">
        <h1 className="h1 ">
          <span className="text-3xl">{props.title}</span>
        </h1>
      </div>
    </div>
  )
}

export default SectionHeader