import React from 'react'; 


const SearchResults = (props) => {
	const users = props.searchResults.map((player, index) => {
		return <div key={player.aid}> 
					{
						index >= props.startingIndex  && index < props.startingIndex + 5 ?
						  <div key={player.aid}> 
								{player.name}
								index: {index}
								<img src={player.avatar} alt="No Avatar Set"/>
							</div>
						: null
					}
					
				</div>
			
		});
	return (
		<div> 
			{users}

		</div>
		)
}

	


export default SearchResults;