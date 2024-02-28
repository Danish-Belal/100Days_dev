import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@repo/ui/button";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
     <Button className="React" children = "Client"appName="Client-react"/>
    </div>
  );
}


