import { Console } from "console";
import { stat } from "fs";
import { createContext, useReducer } from "react";

export const Store = createContext<string | any>("");

type TTokens = {
  accessToken: string;
  refreshToken: string;
};

interface IGState {
  tokens: TTokens;
  organization: boolean;
  userProfile: any;
  totalCart: number;
  cart: [];
  jobCateg: [];
  forumSub: [];
  resetcredentials: string;
  forumPost: [];
  forumPostAdd: [];
  forumPostEdit: boolean;
  currentPost: any;
  posts: [];
}

const gState: IGState = {
  tokens: { accessToken: "", refreshToken: "" },
  organization: false,
  userProfile: {},
  totalCart: 0,
  cart: [],
  jobCateg: [],
  forumSub: [],
  resetcredentials: "",
  forumPostEdit: false,
  forumPost: [],
  forumPostAdd: [],
  currentPost: {},
  posts: [],
};

const reducer = (state: IGState, action: any) => {
  switch (action.type) {
    case "SET_LOGGEDIN":
      return { ...state, loggedin: action.payload };
    case "INCREASE_CART":
      return { ...state, totalCart: state.totalCart + 1 };
    case "DECREASE_CART":
      return { ...state, totalCart: state.totalCart - 1 };
    case "SET_CART":
      const cart_items = JSON.parse(JSON.stringify(state.cart));
      cart_items.push(action.payload);
      return { ...state, cart: cart_items };
    case "UPDATE_CART":
      if (action.payload == undefined) return state;
      return { ...state, cart: action.payload };
    case "SET_RESET":
      return { ...state, resetcredentials: action.payload };
    case "SET_ORGANIZATION":
      return { ...state, organization: action.payload };
    case "SET_PRODUCT_IMAGE":
      return { ...state, productimage: action.payload };
    case "SET_USERINFO":
      const userprofile = state;
      userprofile.userProfile = action.payload;
      return { ...state };
    case "UPDATE_USERNAME":
      const temp = state.userProfile;
      temp.name = action.payload;
      return { ...state, userProfile: temp };
    case "UPDATE_ORGANIZATION_TITLE":
      const org_temp = state.userProfile;
      org_temp.title = action.payload;
      return { ...state, userProfile: org_temp };
    case "SET_IMAGE":
      const temps = state.userProfile;
      temps.image = action.payload;
      return { ...state, userProfile: temps };
    case "UPDATE_JOB_CATEGORY":
      return { ...state, jobCateg: action.payload };
    case "UPDATE_FORUM_CATEGORY":
      return { ...state, forumSub: action.payload };
    case "ADD_TO_JOB_CATEGORY":
      const tempJobCat: string[] = state.jobCateg;
      tempJobCat.push(action.payload);
      return { ...state, jobCategAdd: tempJobCat };
    case "ADD_TO_FORUM_CATEGORY":
      const tempFormSub: string[] = state.forumSub;
      tempFormSub.push(action.payload);
      return { ...state, forumSub: tempFormSub };
    case "ADD_FORUM_COMMENT": // used for forum comments
      const tempPost: any[] = state.forumPost;
      tempPost.unshift(action.payload);
      return { ...state, forumPostAdd: tempPost };
    case "UPDATE_FORUM_COMMENT": // used for forum comments
      return { ...state, forumPost: action.payload };
    case "UPDATE_FORUM_POST_EDIT":
      return { ...state, forumPostEdit: action.payload };
    case "UPDATE_CURRENT_POST":
      return { ...state, currentPost: action.payload };
    case "UPDATE_FORUM_POSTS":
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};

export const ContextWrapper = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, gState);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};
