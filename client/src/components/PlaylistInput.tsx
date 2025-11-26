import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Flame, Loader2 } from "lucide-react";

interface PlaylistInputProps {
  onSubmit: (url: string) => void;
  isLoading?: boolean;
}

export const PlaylistInput = ({ onSubmit, isLoading }: PlaylistInputProps) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const validateSpotifyUrl = (input: string): boolean => {
    const spotifyPlaylistRegex = /^https?:\/\/(open\.)?spotify\.com\/playlist\/[a-zA-Z0-9]+/;
    return spotifyPlaylistRegex.test(input);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("bruh... drop a link first 💀");
      return;
    }

    if (!validateSpotifyUrl(url)) {
      setError("that's not a spotify playlist link bestie 🙄");
      return;
    }

    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-4">
      <div
        className={cn(
          "relative p-1 rounded-2xl transition-all duration-300",
          isFocused
            ? "bg-gradient-to-r from-primary via-secondary to-accent"
            : "bg-border"
        )}
      >
        <div className="flex flex-col sm:flex-row gap-3 p-3 bg-background rounded-xl">
          <Input
            type="text"
            placeholder="paste your spotify playlist link here..."
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base md:text-lg"
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="roast"
            size="lg"
            disabled={isLoading}
            className="w-full sm:w-auto min-w-[140px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                roasting...
              </>
            ) : (
              <>
                <Flame className="w-5 h-5" />
                ROAST ME
              </>
            )}
          </Button>
        </div>
      </div>

      {error && (
        <p className="text-secondary text-sm text-center animate-shake font-medium">
          {error}
        </p>
      )}

      <p className="text-muted-foreground text-xs text-center">
        example: https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M
      </p>
    </form>
  );
};
