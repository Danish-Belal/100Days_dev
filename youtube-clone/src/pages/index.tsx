import Image from "next/image";
import { Inter } from "next/font/google";
import {YoutubeVedioCard} from "../components/YoutubeVedioCard"
import {Searchbar} from "../components/Searchbar"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
    <header>
    <Searchbar />
    </header>
  <main className=" grid  grid-cols-4 mt-5 ">
    <YoutubeVedioCard 
    image={"/photo.jpg"}
    title = {"TFamily Guy MOST Offensive Jokes | PT.1"}
    author = {"StwieTV"}
    views = {"100k+"}
    timeatamp = {"2 days ago"}
    />
    <YoutubeVedioCard 
    image={"/photo.jpg"}
    title = {"TFamily Guy MOST Offensive Jokes | PT.1"}
    author = {"StwieTV"}
    views = {"100k+"}
    timeatamp = {"2 days ago"}
    />
    <YoutubeVedioCard 
    image={"/photo.jpg"}
    title = {"TFamily Guy MOST Offensive Jokes | PT.1"}
    author = {"StwieTV"}
    views = {"100k+"}
    timeatamp = {"2 days ago"}
    />
    <YoutubeVedioCard 
    image={"/photo.jpg"}
    title = {"TFamily Guy MOST Offensive Jokes | PT.1"}
    author = {"StwieTV"}
    views = {"100k+"}
    timeatamp = {"2 days ago"}
    />
    <YoutubeVedioCard 
    image={"/photo.jpg"}
    title = {"TFamily Guy MOST Offensive Jokes | PT.1"}
    author = {"StwieTV"}
    views = {"100k+"}
    timeatamp = {"2 days ago"}
    />
    <YoutubeVedioCard 
    image={"/photo.jpg"}
    title = {"TFamily Guy MOST Offensive Jokes | PT.1"}
    author = {"StwieTV"}
    views = {"100k+"}
    timeatamp = {"2 days ago"}
    />
    <YoutubeVedioCard 
    image={"/photo.jpg"}
    title = {"TFamily Guy MOST Offensive Jokes | PT.1"}
    author = {"StwieTV"}
    views = {"100k+"}
    timeatamp = {"2 days ago"}
    />
    </main>
    </>
  )
 

}
