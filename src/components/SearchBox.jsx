import React from 'react'

const SearchBox = (props) => {
  return (
    <div className='col col-sm-4'> 
    <input type="text"
     className="form-control" 
     value={props.SearchValue}
     onChange={(event)=>props.SetSearchValue(event.target.value)}
     placeholder='Type to search ......'
     />
    </div>
  )
}

export default SearchBox