import MainLayout from "../../components/MainLayout"
import { useEffect, useState } from "react";
import { Forum } from "../../lib/endpoints/forum";
import { useRouter } from "next/router";

export default function onetimesignup(){

    const router = useRouter();

    const [allcategories, setAllCategories] = useState<any>([]);
    const [subscribeBtn, setSubscribe] = useState(false);
    const [selectedCategories, setselectedCategories] = useState<any>([]);

    useEffect(() => {
        (async () => {
          const categories: any = await new Forum().getForumCategories();
          setAllCategories(categories.results);
        })();
      }, []);

      useEffect(() => {
        (async () => {
          const categories: any = await new Forum().getUserSubscriptions();
          const categorysubs = categories.results[0].categories;

          if (categorysubs.length >= 3) {
            router.push("/forum/forum");
          }
          
        })();
      }, []);
    
    const selectCats = (event: any) => {
        let selcats = selectedCategories;
        if (event.target.checked) {
          selcats.push(event.target.value);
        } else {
          selcats = selcats.filter(item => item != event.target.value);
        }
        setselectedCategories(selcats);

        if (selcats.length >= 3) {
            setSubscribe(true);
        } else {
            setSubscribe(false);
        }

    }

    const subscribeCats = async () => {
        const body = {
            categories: selectedCategories
        }
      const result: any = await new Forum().subscribeCategory(body);
      router.push("/forum/forum");
    }
    
    return(
        <MainLayout>
            <div className="forum_container">
                <div className="headerText pt-3 pb-3 pl-3">Tell us about your interest?</div>
                <div className="rule"></div>
            <div className="forum_categorys  row pl-2 pr-2 pb-3">

                {allcategories && allcategories.length > 0 ? allcategories.map((category: any, index: number) => {
                    return (
                            <div className="category col-md-2 mt-2 mt-4" key={category.key}>
                                <input 
                                    type="checkbox" 
                                    id={category.key} 
                                    aria-label="Checkbox for following text input" 
                                    className="mt-2 mr-1 forumcategory-text"
                                    value={category.key}
                                    onChange = {selectCats}
                                    />
                                <label className="forumtextfield">{category.title}</label>
                            </div>
                            );
                        }):

                        <p className="category">No categories Found</p>
                    }
                
            </div>
            </div>
                <div className="row">
                <div className="col-md-6 lowerPageleft">
                <label className="forumtextfield mt-2">Subscribe to 3 more categories to continue</label>
                {/* <div className="progress col-md-4 ml-0">
                <div className="progress-bar w-55" role="progressbar" aria-valueNow="75" aria-Valuemin="0" aria-Valuemax="100"></div>
                </div> */}
                </div>
                
                <div className="col-md-3 lowerPageRight">
                    <button 
                        className="btn btn-primary forumCategory_btn" 
                        id="forum_category_btn"
                        onClick = {() => {router.push("/forum/forum")}}
                        >
                        Skip
                    </button> 
                </div>
                <div className="col-md-3 lowerPageRight">
                { subscribeBtn ?
                    <button 
                        className="btn btn-primary forumCategory_btn" 
                        id="forum_category_btn"
                        onClick = {subscribeCats}
                        >
                        Next
                    </button>
                  : null
                } 
                </div>
                </div>
                
            
        </MainLayout>
    )
}