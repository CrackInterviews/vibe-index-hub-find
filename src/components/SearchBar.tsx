
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-2xl mx-auto"
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Search for vibe projects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 pl-12 bg-secondary/50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
      </div>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
        Powered by AI
      </div>
    </form>
  );
};

export default SearchBar;
