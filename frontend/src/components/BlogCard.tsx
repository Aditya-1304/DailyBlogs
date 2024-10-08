import { Link } from "react-router-dom";

interface BlogCardProps {
  id: number,
  authorName : string;
  title : string;
  content : string;
  publishedDate : string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate
} : BlogCardProps)=> {
  return (
    <Link to={`/blog/${id}`}>
    <div className="p-8 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
    <div className="flex">
      <div className="">
        <Avatar size="small" name={authorName}/>
      </div>
      <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
      {authorName} 
      </div>
      <div className="flex justify-center flex-col pl-2 flex justify-center flex-col">
        <Circle />
      </div>
      <div className="pl-2 font-extralight text-slate-500 text-sm flex justify-center flex-col">
       {publishedDate}
      </div>
      
    </div>
    <div className="text-xl font-semibold pt-2">
      {title}
    </div>
    <div className="text-md font-light pt-2">
      {content.slice(0,100) + "..."}
    </div>
    <div className="text-slate-500 text-sm font-extralight pt-5">
      {`${Math.ceil(content.length / 100)} minutes(s) read`}
    </div>
    {/* <div className="bg-slate-200 h-0.5 w-full text-slate-400" >

    </div> */}
  </div>
  </Link>
  ) 
}

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500">

  </div>
}

export function Avatar({ name, size ="small"} : {name : string , size? : "small" | "big"}) {
  return (
    <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
      <span className={`${size === "small" ? "text-xs" : "text-md"} text-gray-600 dark:text-gray-300`}>{name[0]}</span>
    </div>
  )
  
}