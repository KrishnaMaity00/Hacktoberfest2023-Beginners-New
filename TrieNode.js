<script>

// JavaScript program to find minimum breaks needed
// to break a string in dictionary words.

class TrieNode
{
	constructor()
	{
		this.endOfTree=false;
		this.children=new Array(26);
		for(let i=0;i<26;i++)
			this.children[i]=null;
	}
}

let root = new TrieNode();
let minWordBreak = Number.MAX_VALUE;

// If not present, inserts a key into the trie
	// If the key is the prefix of trie node, just
	// marks leaf node
function insert(key)
{
	let length = key.length;

		let index;

		let pcrawl = root;

		for(let i = 0; i < length; i++)
		{
			index = key[i].charAt(0)- 'a'.charAt(0);

			if(pcrawl.children[index] == null)
				pcrawl.children[index] = new TrieNode();

			pcrawl = pcrawl.children[index];
		}
		
		// mark last node as leaf
		pcrawl.endOfTree = true;
}

// function break the string into minimum cut
	// such the every substring after breaking 
	// in the dictionary.
function _minWordBreak(key)
{
	minWordBreak = Number.MAX_VALUE;
		
	minWordBreakUtil(root, key, 0, Number.MAX_VALUE, 0);
}

function minWordBreakUtil(node,key,start,min_Break,level)
{
	let pCrawl = node;

		// base case, update minimum Break
		if (start == key.length) {
			min_Break = Math.min(min_Break, level - 1);
			if(min_Break<minWordBreak){
				minWordBreak = min_Break;
			}
			return;
		}

		// traverse given key(pattern)
		for (let i = start; i < key.length; i++) {
			let index = key[i].charAt(0) - 'a'.charAt(0);
			if (pCrawl.children[index]==null)
				return;

			// if we find a condition were we can
			// move to the next word in a trie
			// dictionary
			if (pCrawl.children[index].endOfTree) {
				minWordBreakUtil(root, key, i + 1,
						min_Break, level + 1);

			}
			pCrawl = pCrawl.children[index];
		}
}

// Driver code
let keys=["cat", "mat", "ca", "ma",
					"at", "c", "dog", "og", "do" ];

let i;
for (i = 0; i < keys.length ; i++)
	insert(keys[i]);

_minWordBreak("catmatat");

document.write(minWordBreak);

</script>
