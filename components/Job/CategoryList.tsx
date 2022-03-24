const CategoryList = (category, trashItem, findItem) => {
  return(
    <div key={category.key} className="col-md-4 mb-5">
    <div className="categorybtn mr-3">
      <h6 className="categorylabel">
        {category.title}
        <span className="categoryicons">
          <i
            onClick={()=>findItem}
            className="fe fe-edit mr-1"
          />
          <i
            onClick={() => trashItem}
            className="fe fe-trash-2"
          />
        </span>
      </h6>
    </div>
</div>)
}

export default CategoryList;