const PokemonList = ({name, image, type, _callback }) => {
    const style = type + " thumb-container";
    return (
        <div className={style}>
            <div className="detail-wrapper">
                <h3>{name}</h3>
                <img src={image} alt={name} />
                <small>Type: {type}</small>
            </div>
        </div>
    )
}

export default PokemonList