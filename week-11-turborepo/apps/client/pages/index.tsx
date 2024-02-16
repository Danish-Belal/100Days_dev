import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import {Button} from "@repo/ui/button";
import { Signup } from "@repo/ui/signup";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
    <Button  appName="client" className={styles.button}> Click Me </Button>
    <Signup />
      <h1>Hello there</h1>
    </>
  );
}
