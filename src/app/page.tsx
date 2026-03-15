import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Trophy, 
  ArrowRight,
  Sparkles,
  ChevronRight,
  Globe,
  Award
} from "lucide-react";
import ChatBox from "@/components/chat-box";

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-blue-100 text-zinc-900">
      {/* --- MINIMALIST NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-50 px-6 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/80 backdrop-blur-md rounded-xl px-8 py-4 border border-zinc-100 shadow-sm">
           <div className="flex items-center gap-2">
             <GraduationCap className="h-5 w-5 text-blue-600" />
             <span className="text-lg font-semibold tracking-tight">msajce</span>
           </div>
           
           <div className="hidden lg:flex items-center gap-8 font-medium text-xs text-zinc-500">
             <a href="#" className="hover:text-blue-600 transition-colors">admissions</a>
             <a href="#" className="hover:text-blue-600 transition-colors">departments</a>
             <a href="#" className="hover:text-blue-600 transition-colors">research</a>
             <a href="#" className="hover:text-blue-600 transition-colors">campus</a>
           </div>

           <Button size="sm" className="rounded-lg h-9 px-6 text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-800 transition-all border-none">
             portal login
           </Button>
        </div>
      </nav>

      {/* --- LIGHT HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center pt-24 px-6 lg:px-12 bg-zinc-50/50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center w-full relative z-10">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[10px] font-semibold text-blue-600 border border-blue-100">
              <Sparkles className="h-3 w-3" />
              <span>leading technical education since 2001</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-zinc-900">
              cultivating the architects of information technology.
            </h1>
            
            <p className="max-w-xl text-zinc-500 text-base lg:text-lg font-normal leading-relaxed">
              mohamed sathak a j college of engineering offers a sophisticated platform for elite technical learning and research in chennai's premier it corridor.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Button className="rounded-lg px-8 h-12 bg-blue-600 text-white hover:bg-blue-700 transition-all text-xs font-medium shadow-sm border-none">
                apply for 2026
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="rounded-lg px-8 h-12 border-zinc-200 hover:bg-white transition-all text-xs font-medium bg-white text-zinc-600 shadow-sm">
                explore departments
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-100 shadow-xl bg-white p-2">
               <div className="relative h-full w-full rounded-xl overflow-hidden">
                 <Image
                    src="https://images.unsplash.com/photo-1541339907198-e08756ebafe1?q=80&w=2070&auto=format&fit=crop"
                    alt="campus"
                    fill
                    className="object-cover"
                 />
               </div>
            </div>
            
            {/* Minimal Metric Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl border border-zinc-100 shadow-lg animate-in slide-in-from-left-4">
               <div className="flex items-center gap-4">
                 <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-blue-600" />
                 </div>
                 <div>
                    <h4 className="text-sm font-semibold text-zinc-900">a+ rank</h4>
                    <p className="text-[10px] font-medium text-zinc-400">naac accreditation</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MINIMAL STATS SECTION --- */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               { icon: Users, label: "active scholars", value: "5000+" },
               { icon: GraduationCap, label: "global alumni", value: "15k+" },
               { icon: Award, label: "naac grade", value: "a+" },
               { icon: Globe, label: "placement ratio", value: "98%" }
             ].map((stat, i) => (
                <div key={i} className="space-y-4">
                   <div className="h-10 w-10 rounded-lg bg-zinc-50 flex items-center justify-center border border-zinc-100">
                      <stat.icon className="h-5 w-5 text-zinc-400" />
                   </div>
                   <div>
                      <h4 className="text-2xl font-semibold tracking-tight text-zinc-900">{stat.value}</h4>
                      <p className="text-[11px] text-zinc-500 font-medium">{stat.label}</p>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- LIGHT BENTO GRID --- */}
      <section className="py-32 px-6 lg:px-12 bg-zinc-50/50 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 space-y-4">
            <p className="text-blue-600 font-semibold text-[11px]">institutional profile</p>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">the msajce edge.</h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl p-10 flex flex-col justify-between border border-zinc-100 shadow-sm min-h-[350px]">
               <div className="space-y-4">
                  <Trophy className="h-8 w-8 text-blue-600" />
                  <h3 className="text-xl font-semibold text-zinc-900">elite ranking</h3>
                  <p className="text-zinc-500 font-normal text-base leading-relaxed max-w-md">
                    consistently ranked in the nirf top engineering category, reflecting our commitment to research-driven education and global placements.
                  </p>
               </div>
               <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs transition-all cursor-pointer">
                  read nirf 2026 data <ArrowRight className="h-4 w-4" />
               </div>
            </div>

            <div className="bg-white rounded-2xl p-10 space-y-6 border border-zinc-100 shadow-sm">
               <div className="space-y-2">
                  <h4 className="text-4xl font-semibold text-blue-600">45+</h4>
                  <p className="text-xs text-zinc-400 font-semibold">research labs</p>
               </div>
               <p className="text-zinc-500 font-normal text-sm leading-relaxed">equipped with state-of-the-art vlsi and ai processing units for advanced scholars.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- MINIMALIST DEPARTMENT LIST --- */}
      <section className="py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
           <div className="lg:col-span-4 space-y-6">
              <h2 className="text-4xl font-semibold tracking-tight text-zinc-900 leading-tight">global faculties</h2>
              <p className="text-zinc-500 font-normal text-base leading-relaxed">specialized engineering programs designed for the 2026 industrial landscape.</p>
              <Button variant="outline" size="sm" className="rounded-lg border-zinc-200 text-zinc-600 py-6 px-8 text-xs font-medium bg-zinc-50/50 hover:bg-white transition-all">
                 all programs
              </Button>
           </div>
           
           <div className="lg:col-span-8 divide-y divide-zinc-50">
              {[
                "computer science & engineering",
                "information technology",
                "electronics & communication",
                "civil engineering",
                "mechanical engineering"
              ].map((dept, i) => (
                <div key={i} className="group py-8 flex items-center justify-between cursor-pointer hover:px-4 transition-all duration-300">
                   <div className="flex items-center gap-8">
                      <span className="text-zinc-200 text-xl font-medium group-hover:text-blue-200 transition-colors">0{i+1}</span>
                      <h3 className="text-lg font-medium text-zinc-600 group-hover:text-blue-600 transition-colors">{dept}</h3>
                   </div>
                   <ArrowRight className="h-5 w-5 text-zinc-200 group-hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100" />
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- LIGHT FOOTER --- */}
      <footer className="py-24 px-6 lg:px-12 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold tracking-tight text-zinc-900 lowercase">msajce</h3>
            <p className="text-zinc-500 font-normal text-xs leading-relaxed max-w-[240px]">
              siruseri it park, omr, chennai. <br />
              setting engineering standards since 2001.
            </p>
          </div>
          
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">education</p>
            <ul className="space-y-2 text-zinc-500 text-xs font-normal">
               <li className="hover:text-blue-600 cursor-pointer">academic calendar</li>
               <li className="hover:text-blue-600 cursor-pointer">examination portal</li>
               <li className="hover:text-blue-600 cursor-pointer">department portfolios</li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">legal</p>
            <ul className="space-y-2 text-zinc-500 text-xs font-normal">
               <li className="hover:text-blue-600 cursor-pointer">privacy policy</li>
               <li className="hover:text-blue-600 cursor-pointer">terms of service</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl border border-zinc-100 space-y-4 shadow-sm">
             <p className="text-[10px] font-bold text-zinc-900 lowercase">newsletter signup</p>
             <div className="flex flex-col gap-2">
                <input type="email" placeholder="email address" className="bg-zinc-50 border border-zinc-100 rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-blue-600 transition-colors" />
                <Button size="sm" className="rounded-lg h-9 text-[10px] font-medium bg-zinc-900 text-white border-none">subscribe</Button>
             </div>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-zinc-100 text-center text-[10px] text-zinc-400 font-normal">
          © 2026 mohamed sathak a j college of engineering. all rights reserved.
        </div>
      </footer>

      <ChatBox />
    </main>
  );
}
