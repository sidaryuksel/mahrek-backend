const uniqueId = (() => {
    function* uniqueIdGenerator() {
      let id = Date.now();
      
      while(true) {
        yield id++;
      }
    }
    
    const gen = uniqueIdGenerator();
    
    return () => gen.next().value;
  })()



export default class Tree {
    #children = new Map();
    #parent: any = null;
    #id = uniqueId();
    #name;
    
    constructor(name: any) {
      if(!name || typeof name !== 'string' || !name.trim().length) {
        throw new Error('Name must be a non-empty String');
      }
      
      this.#name = name;
    }
  
    get name() {
      return this.#name;
    }
    
    set name(newName) {
      if(!newName || typeof newName !== 'string' || !newName.trim().length) {
        throw new Error('Cannot change name.Name must be a non-empty String');
      }
      
      this.#name = newName;
    }
  
    get identifier() {
      return this.#id;
    }
  
    get children() {
      return Array.from(this.#children.values());
    }
  
    get parentNode() {
      return this.#parent;
    }
  
    set parentNode(newParent: any) {
      if(newParent !== this.parentNode && (newParent === null || newParent instanceof Tree)) {
        if(this.#parent) {
           this.#parent.removeChildNode(this);
        }
        
        this.#parent = newParent;
        
        if(newParent) {
          newParent.appendChildNode(this);
        }
      }
    }
  
    get childrenCount() {
      return this.#children.size;
    }
  
    createChildNode(name: any) {
      const newNode = new Tree(name);
      this.#children.set(newNode.identifier, newNode);
      newNode.parentNode = this;
      
      return newNode;
    }
  
    hasChildNode(needle: any) {
      if(needle instanceof Tree) {
        return this.#children.has(needle.identifier);
      }
      
      for(let child of this.children) {
        if(child.name === needle || this.identifier === needle) {
          return true
        }
      }
      
      return false;
    }
  
    getChildNode(nameOrId: any) {
      for(let child of this.children) {
        if(child.name === nameOrId || this.identifier === nameOrId) {
          return child;
        }
      }
      
      return null;
    }
  
    removeChildNode(needle: any) {
      if(!this.hasChildNode(needle)) return;
      
      let removedNode;
      
      if(needle instanceof Tree) {
        this.#children.delete(needle.identifier);
        removedNode = needle;
      } else {
        for(let child of this.children) {
          if(child.name === needle || child.identifier === needle) {
            this.#children.delete(child.identifier);
            removedNode = child;
            break;
          }
        }
      }
      
      if(removedNode) {
        removedNode.parentNode = null;
      }
    }
  
    appendChildNode(node: any) {
      if(!(node instanceof Tree) || this.hasChildNode(node)) return;
      
      if(node === this) throw new Error('Node cannot contain itself');
      
      let parent: any = this.parentNode;
      while(parent !== null) {
        if(parent === node) throw new Error('Node cannot contain one of its ancestors');
        parent = parent.parentNode;
      }
      
      this.#children.set(node.identifier, node);
      node.parentNode = this;
    }
  
    #getTreeString = (node: any, spaceCount = 0) => {
      let str = "\n";
 
      node.children.forEach((child: any) => {
        str += `${" ".repeat(spaceCount)}${child.name}${this.#getTreeString(child, spaceCount + 2)}`
      })
  
      return str;
    }
  
    print() {
      console.log(`\n${this.name}${this.#getTreeString(this, 2)}`);
    }
  
    traverse(cb: any) {
      for(let child of this.children) {
        if(cb(child) === true || child.traverse(cb) === true) {
          return true;
        }
      }
    }
  
    findNodeByName(name: any) {
      let foundNode = null;
      
      this.traverse((node: any) => {
        if(node.name === name) {
          foundNode = node;
          return true;
        }
      })
      
      return foundNode;
    }
  
    findAllNodesByName(name: any) {
      const children:any = [];
      
      this.traverse((node: any) => {
        if(node.name === name ) {
          children.push(node);
        }
      })
      
      return children;
    }
  }
  