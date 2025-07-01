import { ArrowRight, Feather } from "lucide-react";
import Link from "next/link";
import Navbar from "./Componenets/Navbar";
import HomeNavbar from "./Componenets/HomeNavbar";
import Feature from "./Componenets/Feature";
import { Herr_Von_Muellerhoff } from "next/font/google";
import Hero from "./Componenets/hero";
import Footer from "./Componenets/footer";


export default function Home() {
  return (
    <div>
      <Hero/>
      <Feature/>
      <Footer/>
    </div>
 
  );
}
