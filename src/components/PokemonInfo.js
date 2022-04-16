import React from 'react'

const PokemonInfo = ({ data }) => {
    console.log(data)
    return (
        <>
            <div className="right-content">
                {
                (!data) ? "" : (
                    <>  <h1>{data.name}</h1>
                        <img src={data.sprites.other.dream_world.front_default} alt={data.name} />
                        <div className="abilities">
                            {data.abilities.map(pokemon => {
                                return (
                                    <>
                                        <div className="group">
                                            <h2>{pokemon.ability.name}</h2>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                        <div className="base-stat">
                            {
                                data.stats.map(pokemon => {
                                    return (
                                        <>
                                            <h3>{pokemon.stat.name}:{ pokemon.base_stat}</h3>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </>
                )
                }
            </div>
            
        </>
  )
}

export default PokemonInfo