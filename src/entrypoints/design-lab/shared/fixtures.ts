import type { BloomContext } from "@/shared/types/messaging";
import type { UserScrapbook } from "@/shared/types/models";

export const designLabContext: BloomContext = {
  term: "Semantic compression",
  explanation: "",
  metadata: {
    url: "https://example.com/reading/meaning",
    title: "Meaning is not the same thing as volume",
    surroundingText:
      "The useful trick is semantic compression: reducing information without flattening what makes it meaningful.",
  },
  timestamp: Date.now(),
};

export const initialScrapbookItems: UserScrapbook[] = [
  {
    id: 1,
    term: "Semantic compression",
    explanation:
      "Preserving the essential meaning of information while representing it in a more compact form.",
    domainUrl: "https://example.com/reading/meaning",
    learnedAt: Date.now() - 1000 * 60 * 45,
  },
  {
    id: 2,
    term: "Latent space",
    explanation:
      "A compressed mathematical space in which related ideas or features are positioned near one another.",
    domainUrl: "https://example.com/notes/latent-space",
    learnedAt: Date.now() - 1000 * 60 * 60 * 26,
  },
  {
    id: 3,
    term: "Epistemic humility",
    explanation:
      "An awareness of the limits of one’s knowledge and a willingness to revise beliefs when evidence changes.",
    domainUrl: "https://example.com/essays/knowing",
    learnedAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
];
