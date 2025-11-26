import { useState } from "react";
import { PlaylistInput } from "@/components/PlaylistInput";
import { RoastCard } from "@/components/RoastCard";
import { FloatingEmoji } from "@/components/FloatingEmoji";
import { Music2, Sparkles } from "lucide-react";

// Mock roasts for demo - replace with API call later
const mockRoasts = [
  "bestie... your playlist screams 'I discovered music in 2019 and never evolved' 💀 like we get it, you peaked during quarantine. the main character syndrome is strong but the music taste? mid at best. also why do you have 47 sad songs followed by one random EDM banger? therapy exists babes.",
  "not the 'I'm so quirky and different' playlist with literally the most basic songs on Spotify rn 😭 you thought adding one indie track would save this? nah fam. your spotify wrapped is gonna be embarrassing and you know it. the algorithm is crying.",
  "okay so you either just went through a breakup or you're manifesting one because this playlist is EMOTIONALLY UNHINGED 🫠 we got sad girl autumn, revenge era, and 'healing but make it toxic' all in 30 songs. iconic chaos ngl but also... you good?",
];

const Index = () => {
  const [roast, setRoast] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    setRoast("");

    // TODO: Replace with actual API call
    // const response = await fetch('/api/roast', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ playlistUrl: url })
    // });
    // const data = await response.json();
    // setRoast(data.roast);

    // Mock delay for demo
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const randomRoast = mockRoasts[Math.floor(Math.random() * mockRoasts.length)];
    setRoast(randomRoast);
    setIsLoading(false);
  };

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      
      {/* Floating emojis */}
      <FloatingEmoji emoji="🎵" className="top-20 left-[10%]" delay={0} />
      <FloatingEmoji emoji="🔥" className="top-32 right-[15%]" delay={0.5} />
      <FloatingEmoji emoji="💀" className="top-[40%] left-[5%]" delay={1} />
      <FloatingEmoji emoji="😭" className="top-[50%] right-[8%]" delay={1.5} />
      <FloatingEmoji emoji="✨" className="bottom-32 left-[12%]" delay={2} />
      <FloatingEmoji emoji="🎧" className="bottom-20 right-[10%]" delay={0.3} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <header className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border mb-6">
            <Music2 className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">powered by AI that has zero chill</span>
            <Sparkles className="w-4 h-4 text-secondary" />
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight">
            <span className="gradient-text">SPOTIFY</span>
            <br />
            <span className="text-foreground">PLAYLIST</span>
            <br />
            <span className="gradient-text-alt neon-glow-pink">ROASTER</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto mt-6">
            drop your playlist link and let AI expose your{" "}
            <span className="text-secondary font-semibold">questionable</span> music taste
          </p>
        </header>

        {/* Input Section */}
        <section className="mb-8">
          <PlaylistInput onSubmit={handleSubmit} isLoading={isLoading} />
        </section>

        {/* Roast Display */}
        <section>
          <RoastCard roast={roast} isLoading={isLoading} />
        </section>

        {/* Footer */}
        <footer className="mt-16 md:mt-24 text-center">
          <p className="text-muted-foreground text-sm">
            made with 💅 and absolutely no respect for your music taste
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground/60">
            <span>not affiliated with Spotify</span>
            <span className="text-primary">•</span>
            <span>all roasts are AI-generated</span>
          </div>
        </footer>
      </div>

      {/* Decorative corner elements */}
      <div className="fixed top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent blur-3xl" />
      <div className="fixed top-0 right-0 w-32 h-32 bg-gradient-to-bl from-secondary/20 to-transparent blur-3xl" />
      <div className="fixed bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent/20 to-transparent blur-3xl" />
      <div className="fixed bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/20 to-transparent blur-3xl" />
    </main>
  );
};

export default Index;
