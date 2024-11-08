import LocationCheck from "./LocationCheck"

function LocationsCategorized({ category, search, setCheckState, filter, onClicked, isCollapsed, checkedBoxes }) {
    const isAvaliableLocation = (location) => (location.name.toLowerCase().includes(search) || location.category.toLowerCase().includes(search))
    if (category.locations.filter(isAvaliableLocation).length === 0) return <></>

    const mapLocationsToNodes = (location, index, array) => {
        const matchesNameOrCategory = (location.name.toLowerCase().includes(search) || location.category.toLowerCase().includes(search))
        const isSearching = search !== ""

        const notSearchOrMatchesSearch = !isSearching || matchesNameOrCategory
        const isChecked = filter === 1 && (checkedBoxes[location.index] && checkedBoxes[location.index].checked)

        if (isChecked) return

        return (notSearchOrMatchesSearch) &&
        <>
            {!isCollapsed && (index === 0 || location.category !== array[index-1].category) ? <label className="NodeName"><b>{location.category}</b></label> : <></>}
            {!isCollapsed && <LocationCheck key={index} index={location.index} locationName={location} checkData={checkedBoxes[location.index]} setCheckState={setCheckState} />}
        </>
    }

    const isCompleted = (location) => checkedBoxes[location.index]?.checked
    const totalCompleted = category.locations.filter(isCompleted).length
    const numberCleared = totalCompleted === category.locations.length ? <span>Fully Cleared</span> : <span>{totalCompleted} / {category.locations.length} complete</span>
    return (
        <div className="category">
            <label className="MapAreaName" onClick={onClicked} style={{color: category.color}}>{category.name} {numberCleared}</label><br/>
            {category.locations.map(mapLocationsToNodes)}
        </div>
    )
}

export default LocationsCategorized
