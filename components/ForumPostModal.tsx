import React from 'react'
import { useEffect, useState, useContext } from "react";
import { Forum } from "../lib/endpoints/forum";
import { Store } from "../contextStore";
import { Editor } from '@tinymce/tinymce-react';

function ForumPostModal({posts, setAllPosts, allcategories, post=null, edit=false, setEdit}) {

  const { state, dispatch } = useContext(Store);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categoriesSelected, setselectedCategories]  = useState<any>([]);
  
  const setCategories = (event: any) => {
    let currPost = {...state.currentPost};
    let selcats: any[] = !state.forumPostEdit ? categoriesSelected : [...currPost.categories];

        
      
    if (event.target.checked) {
      if (!selcats.includes(event.target.value)) {
        selcats.push(event.target.value);
      }
    } else {
      selcats = selcats.filter(item => item != event.target.value);
    }
    setselectedCategories([...selcats]);

    currPost = {...currPost, categories: selcats}

    setCurrentPost(currPost);
  }

  const setPostTitle = (updatedTitle:string) => {
    setTitle(updatedTitle);
    setCurrentPost({...state.currentPost, title: updatedTitle})
  }

  const setCurrentPost = (currPost) => {
    dispatch({
      type: "UPDATE_CURRENT_POST",
      payload: currPost,
    });
  }



  const submitPost = async (event: any) => {
    event.preventDefault();
    const body = {
      title: title ? title : state.forumPostEdit ? state.currentPost.title : "" ,
      body: description ? description : state.forumPostEdit ? state.currentPost.description : "",
      categories: categoriesSelected.length > 0 ? categoriesSelected : state.forumPostEdit ?  state.currentPost.categories: []
    };

    if (!state.forumPostEdit) {
      const result = await new Forum().createPost(body);
      if (result) {
        posts.unshift(result);
        dispatch({
          type: "UPDATE_FORUM_POSTS",
          payload: posts,
        });
    
        setselectedCategories([]);
        setTitle("");
        setDescription("");
    
        dispatch({
          type: "UPDATE_FORUM_POST_EDIT",
          payload: false,
        });
      }
    } else {
      const result = await new Forum().editPost(body, post.key);
      
      if (result) {
          let index = posts.findIndex(item => item.key === post.key);
          if (index !== -1) {
            posts[index] = result;

          } 
          dispatch({
            type: "UPDATE_FORUM_POSTS",
            payload: posts,
          });
      
          setselectedCategories([]);
          setTitle("");
          setDescription("");
      
          dispatch({
            type: "UPDATE_FORUM_POST_EDIT",
            payload: false,
          });
      }
         
    }
  }

  const closeModal = () => {
    if (state.forumPostEdit) {
      setselectedCategories([]);
      setTitle("");
      setDescription("");
      dispatch({
        type: "UPDATE_FORUM_POST_EDIT",
        payload: false,
      });
    }
  }

  
    return (
    <div>
        <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content modalforum-size">
            <div className="modal-header">
              <h5
                className="modal-title headerText"
                id="exampleModalLongTitle"
              >
                {state.forumPostEdit ? `Edit ${state.currentPost.title }` : "New Topic" }
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1" className="headerText">
                    Topic Title
                  </label>
                    <input
                      value={state.forumPostEdit ? state.currentPost.title: title} 
                      type="text" 
                      className="form-control" 
                      name="addForumTopic" 
                      id="addForumTopic"
                      onChange = {(e) => setPostTitle(e.target.value)}
                    />
                  <small id="emailHelp" className="form-text text-muted">
                    The topic must contain a maximum of 60 caracters
                  </small>
                </div>
                <div className="form-group headerText headerText">
                  <div>
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="headerText"
                    >
                      Description
                    </label>
                    {/* <textarea
                      className="form-control"
                      style={{resize:'none'}}
                      id="exampleFormControlTextarea1"
                      placeholder="What's on your mind?"
                      rows={4}
                      defaultValue={""}
                      onChange = {(e) => setDescription(e.target.value)}
                    /> */}

                         <Editor
                            apiKey ='jnq6bu3a3gvvn2nvdtz5e65m7ffttui7jqw5pgo6wvksdzo1'
                            value={state.forumPostEdit ? state.currentPost.body: description}
                            init={{
                              placeholder: "What's on your mind?",
                              height: 150,
                              force_br_newlines : false,
                              force_p_newlines : false,
                              forced_root_blocks : false,
                              branding: false,
                              menubar: false,
                              resize: false,
                              statusbar: false,
                              plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code wordcount emoticons'
                              ],
                              toolbar:
                                'bold italic| \
                                emoticons'
                            }}
                            onEditorChange={value => setDescription(value)
                            }
                          />
                          
                  </div>
                </div>
                <div className="form-check row p-0">
                  <label
                    className="headerText pl-3 row category_header"
                  >
                    Add Category
                  </label>
                  <div className="forum_categorys pt-0 row pl-4 pr-6 pb-3">
                  {allcategories && allcategories.length > 0 ? allcategories.map((category: any, index: number) => {
                    let selcategories: any[];// original code
                    let checked: boolean;

                    selcategories =state.forumPostEdit ? state.currentPost.categories: categoriesSelected;
                    checked = selcategories.includes(category.key) ? true: false;
                    
                    return (
                    <div className="category col-md-2" key={index}>
                      <input
                        type="checkbox"
                        aria-label="Checkbox for following text input"
                        className="mt-2 mr-1 forumcategory-text"
                        key={category.key}
                        id = {category.key}
                        value = {category.key}
                        onChange = {setCategories}
                        checked = {checked}
                      />
                      <label className="forumtextfield">{category.title}</label>
                    </div> );
                    }) : <p>No Categories Found</p>
                  } 
                  </div>

                  {/*mobile view for add category start*/}
                  <div className="">
              <form>
                <div className="multiselect">
                  <div className="selectBox"  onClick={() => showCheckboxes()}>
                    <select>
                      <option>Add Category</option>                      
                    </select>                    
                    <div className="overSelect"></div>
                  </div>
                  <div id="checkboxes">
                  {
                    
                    allcategories && allcategories.length > 0 ? allcategories.map((category: any, index: number) => {
                      let selcategories: any[];// original code
                      let checked: boolean;
  
                      selcategories =state.forumPostEdit ? state.currentPost.categories: categoriesSelected;
                      checked = selcategories.includes(category.key) ? true: false;
                    return(
                      
                        <label htmlFor={(index).toString()} key={index}>
                          <input type="checkbox" 
                                  className="mr-2 mt-1 ml-2"
                                  key={category.key}
                                  id = {category.key}
                                  value = {category.key}
                                  checked = {checked}
                                  onChange = {setCategories}/>
                                {category.title}
                          </label>                        
                      
                      );
                        
                      }) : <p>No Categories Found</p>
                    }
                    </div>
                  
                </div>
              </form>
              </div>
                  {/*mobile view for add category start*/}
                </div >
                <div className="row forumpost_btn">
                <button
                  data-dismiss="modal"
                  type="submit"
                  className="btn btn-primary forum_post_btn"
                  onClick = {submitPost}
                >
                  Post
                </button>
                </div>
               
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
}

export default ForumPostModal

var expanded = false;
function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

function strip_html_tags(description)
{
   if ((description===null) || (description===''))
       return false;
  else
  description = description.toString();
  return description.replace(/<[^>]*>/g, '');
}

