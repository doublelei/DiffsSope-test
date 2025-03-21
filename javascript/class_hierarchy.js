/**
 * JavaScript test file for class hierarchy changes.
 * 
 * This file demonstrates class inheritance structures 
 * to test DiffScope's ability to detect changes in class hierarchies.
 */

/**
 * Base class for all entities in the system.
 */
class Entity {
  /**
   * Create a new entity.
   * @param {string} id - Unique identifier
   * @param {string} name - Display name
   */
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.tags = new Set();
    this.createdAt = new Date(); // New field
  }
  
  /**
   * Add a tag to this entity.
   * @param {string} tag - Tag to add
   */
  addTag(tag) {
    this.tags.add(tag);
  }
  
  /**
   * Remove a tag from this entity if it exists.
   * @param {string} tag - Tag to remove
   * @returns {boolean} True if tag was removed, false if it didn't exist
   */
  removeTag(tag) {
    if (this.tags.has(tag)) {
      this.tags.delete(tag);
      return true;
    }
    return false;
  }
  
  /**
   * Check if this entity has the specified tag.
   * @param {string} tag - Tag to check
   * @returns {boolean} True if entity has the tag
   */
  hasTag(tag) {
    return this.tags.has(tag);
  }
  
  /**
   * String representation of this entity.
   * @returns {string} String representation
   */
  toString() {
    return `${this.constructor.name}(id=${this.id}, name=${this.name})`;
  }
}

/**
 * Interface for objects that can be searched.
 */
class Searchable {
  /**
   * Get search terms for this object.
   * @abstract
   * @returns {Array<string>} Search terms
   */
  getSearchTerms() {
    throw new Error('Method getSearchTerms() must be implemented');
  }
}

/**
 * Interface for objects that can be printed.
 */
class Printable {
  /**
   * Convert to a printable format.
   * @abstract
   * @returns {string} Printable representation
   */
  toPrintableFormat() {
    throw new Error('Method toPrintableFormat() must be implemented');
  }
  
  /**
   * Convert to HTML format.
   * @abstract
   * @returns {string} HTML representation
   */
  toHtml() {
    throw new Error('Method toHtml() must be implemented');
  }
}

/**
 * Interface for objects that have a name attribute.
 */
class Named {
  /**
   * Get the display name for this object.
   * @abstract
   * @returns {string} Display name
   */
  getDisplayName() {
    throw new Error('Method getDisplayName() must be implemented');
  }
}

/**
 * Enables an object to be serialized to JSON.
 * @mixin
 */
const Serializable = {
  /**
   * Convert to JSON string.
   * @returns {string} JSON string
   */
  toJson() {
    return JSON.stringify(this);
  },
  
  /**
   * Get properties for serialization.
   * @returns {Object} Serializable properties
   */
  getSerializableProps() {
    return Object.assign({}, this);
  }
};

/**
 * Represents a user in the system.
 * @extends Entity
 * @implements Named, Searchable
 */
class User extends Entity {
  /**
   * Create a new user.
   * @param {string} id - Unique identifier
   * @param {string} name - Display name
   * @param {string} email - Email address
   * @param {string} [role="standard"] - User role
   */
  constructor(id, name, email, role = "standard") {
    super(id, name);
    this.email = email;
    this.role = role;
    this.permissions = new Set();
    this.lastLogin = null; // New field
    
    // Apply the Serializable mixin
    Object.assign(this, Serializable);
  }
  
  /**
   * Add a permission to this user.
   * @param {string} permission - Permission to add
   */
  addPermission(permission) {
    this.permissions.add(permission);
  }
  
  /**
   * Check if this user has the specified permission.
   * @param {string} permission - Permission to check
   * @returns {boolean} True if user has the permission
   */
  hasPermission(permission) {
    return this.permissions.has(permission);
  }
  
  /**
   * Get the display name for this user.
   * @returns {string} Display name
   */
  getDisplayName() {
    return `${this.name} (${this.email})`;
  }
  
  /**
   * Get search terms for this user.
   * @returns {Array<string>} Search terms
   */
  getSearchTerms() {
    return [this.id, this.name, this.email, this.role];
  }
  
  /**
   * Get serializable properties for this user.
   * @override
   * @returns {Object} Serializable properties
   */
  getSerializableProps() {
    const props = Object.assign({}, this);
    // Convert sets to arrays for serialization
    props.permissions = [...this.permissions];
    props.tags = [...this.tags];
    return props;
  }
}

/**
 * Base class for all resources.
 * @extends Entity
 */
class BaseResource extends Entity {
  /**
   * Create a new base resource.
   * @param {string} id - Unique identifier
   * @param {string} name - Display name
   * @param {string} ownerId - Owner's ID
   */
  constructor(id, name, ownerId) {
    super(id, name);
    this.ownerId = ownerId;
    this.data = {};
  }
  
  /**
   * Update a data field for this resource.
   * @param {string} key - Field key
   * @param {*} value - Field value
   */
  updateData(key, value) {
    this.data[key] = value;
  }
  
  /**
   * Get a data field from this resource.
   * @param {string} key - Field key
   * @param {*} [defaultValue=null] - Default value if key doesn't exist
   * @returns {*} Field value or default
   */
  getData(key, defaultValue = null) {
    return key in this.data ? this.data[key] : defaultValue;
  }
}

/**
 * Represents a resource in the system.
 * @extends BaseResource
 * @implements Named, Printable, Searchable
 */
class Resource extends BaseResource {
  /**
   * Create a new resource.
   * @param {string} id - Unique identifier
   * @param {string} name - Display name
   * @param {string} ownerId - Owner's ID
   * @param {string} resourceType - Type of resource
   */
  constructor(id, name, ownerId, resourceType) {
    super(id, name, ownerId);
    this.resourceType = resourceType;
    
    // Apply the Serializable mixin
    Object.assign(this, Serializable);
  }
  
  /**
   * Get the display name for this resource.
   * @returns {string} Display name
   */
  getDisplayName() {
    return `${this.name} (${this.resourceType})`;
  }
  
  /**
   * Convert to a printable format.
   * @returns {string} Printable representation
   */
  toPrintableFormat() {
    return `Resource: ${this.name}\nType: ${this.resourceType}\nOwner: ${this.ownerId}\nData: ${JSON.stringify(this.data)}`;
  }
  
  /**
   * Convert to HTML format.
   * @returns {string} HTML representation
   */
  toHtml() {
    return `<div class="resource"><h2>${this.name}</h2><p>Type: ${this.resourceType}</p></div>`;
  }
  
  /**
   * Get search terms for this resource.
   * @returns {Array<string>} Search terms
   */
  getSearchTerms() {
    return [this.id, this.name, this.resourceType];
  }
  
  /**
   * Get serializable properties for this resource.
   * @override
   * @returns {Object} Serializable properties
   */
  getSerializableProps() {
    const props = Object.assign({}, this);
    props.tags = [...this.tags];
    return props;
  }
}

/**
 * Represents a document resource.
 * @extends Resource
 */
class Document extends Resource {
  /**
   * Create a new document.
   * @param {string} id - Unique identifier
   * @param {string} name - Display name
   * @param {string} ownerId - Owner's ID
   * @param {string} [content=""] - Document content
   */
  constructor(id, name, ownerId, content = "") {
    super(id, name, ownerId, "document");
    this.content = content;
    this.version = 1;
    this.lastModified = new Date(); // New field
  }
  
  /**
   * Update the document content.
   * @param {string} newContent - New content
   */
  updateContent(newContent) {
    this.content = newContent;
    this.version++;
    this.lastModified = new Date();
  }
  
  /**
   * Convert to a printable format.
   * @returns {string} Printable representation
   */
  toPrintableFormat() {
    const baseFormat = super.toPrintableFormat();
    return `${baseFormat}\nVersion: ${this.version}\nContent: ${this.content.substring(0, 50)}...`;
  }
  
  /**
   * Convert to HTML format.
   * @override
   * @returns {string} HTML representation
   */
  toHtml() {
    return `
    <div class="document">
      <h2>${this.name}</h2>
      <p>Version: ${this.version}</p>
      <div class="content">${this.content.substring(0, 100)}...</div>
    </div>
    `;
  }
  
  /**
   * Get search terms for this document.
   * @override
   * @returns {Array<string>} Search terms
   */
  getSearchTerms() {
    const terms = super.getSearchTerms();
    terms.push(this.content);
    return terms;
  }
}

/**
 * Represents an image resource.
 * @extends Resource
 */
class Image extends Resource {
  /**
   * Create a new image.
   * @param {string} id - Unique identifier
   * @param {string} name - Display name
   * @param {string} ownerId - Owner's ID
   * @param {number} width - Image width in pixels
   * @param {number} height - Image height in pixels
   * @param {string} [format="png"] - Image format
   */
  constructor(id, name, ownerId, width, height, format = "png") {
    super(id, name, ownerId, "image");
    this.width = width;
    this.height = height;
    this.format = format;
    this.url = null; // New field
  }
  
  /**
   * Set the URL for this image.
   * @param {string} url - Image URL
   */
  setUrl(url) {
    this.url = url;
  }
  
  /**
   * Convert to a printable format.
   * @returns {string} Printable representation
   */
  toPrintableFormat() {
    const baseFormat = super.toPrintableFormat();
    return `${baseFormat}\nDimensions: ${this.width}x${this.height}\nFormat: ${this.format}`;
  }
  
  /**
   * Convert to HTML format.
   * @override
   * @returns {string} HTML representation
   */
  toHtml() {
    const imgSrc = this.url || "placeholder.jpg";
    return `
    <div class="image">
      <h2>${this.name}</h2>
      <p>Dimensions: ${this.width}x${this.height}</p>
      <p>Format: ${this.format}</p>
      <img src="${imgSrc}" alt="${this.name}" />
    </div>
    `;
  }
}

/**
 * Represents a guest user with limited permissions.
 * @extends User
 */
class GuestUser extends User {
  /**
   * Create a new guest user.
   * @param {string} id - Unique identifier
   * @param {string} [name="Guest"] - Display name
   */
  constructor(id, name = "Guest") {
    super(id, name, `guest_${id}@example.com`, "guest");
    this.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
  }
  
  /**
   * Check if this guest user has expired.
   * @returns {boolean} True if expired
   */
  isExpired() {
    return new Date() > this.expiresAt;
  }
  
  /**
   * Get the display name for this guest.
   * @override
   * @returns {string} Display name
   */
  getDisplayName() {
    return `Guest: ${this.name}`;
  }
}

/**
 * Represents an admin user with extended permissions.
 * @extends User
 */
class AdminUser extends User {
  /**
   * Create a new admin user.
   * @param {string} id - Unique identifier
   * @param {string} name - Display name
   * @param {string} email - Email address
   * @param {number} [adminLevel=1] - Admin level
   */
  constructor(id, name, email, adminLevel = 1) {
    super(id, name, email, "admin");
    this.adminLevel = adminLevel;
    
    // Default admin permissions
    this.addPermission("create_user");
    this.addPermission("delete_user");
    this.addPermission("edit_resource");
    
    // Higher level admins get more permissions
    if (adminLevel >= 2) {
      this.addPermission("manage_roles");
      this.addPermission("view_logs");
    }
    
    if (adminLevel >= 3) {
      this.addPermission("system_config");
    }
  }
  
  /**
   * Check if this admin can manage users.
   * @returns {boolean} True if admin can manage users
   */
  canManageUsers() {
    return this.hasPermission("create_user") && this.hasPermission("delete_user");
  }
  
  /**
   * Check if this admin can configure the system.
   * @returns {boolean} True if admin can configure the system
   */
  canConfigureSystem() {
    return this.hasPermission("system_config");
  }
  
  /**
   * Get the display name for this admin.
   * @override
   * @returns {string} Display name
   */
  getDisplayName() {
    return `Admin(L${this.adminLevel}): ${this.name} (${this.email})`;
  }
}

// Demo usage
if (require.main === module) {
  // Create an admin user
  const admin = new AdminUser("admin1", "Admin User", "admin@example.com", 2);
  admin.addTag("administrator");
  
  // Create a standard user
  const user = new User("user1", "Standard User", "user@example.com");
  user.addTag("beta-tester");
  
  // Create a guest user
  const guest = new GuestUser("guest1");
  guest.addTag("temporary");
  
  // Create a document
  const doc = new Document("doc1", "Important Document", "user1", "This is an important document");
  doc.addTag("important");
  
  // Create an image
  const img = new Image("img1", "Profile Photo", "user1", 1200, 800);
  img.addTag("profile");
  img.setUrl("profile.jpg");
  
  // Demonstrate hierarchy
  const entities = [admin, user, guest, doc, img];
  for (const entity of entities) {
    console.log(`\n${entity}`);
    
    // Named interface
    if (entity instanceof User || entity instanceof Resource) {
      console.log(`Display name: ${entity.getDisplayName()}`);
    }
    
    // Printable interface
    if (entity instanceof Resource) {
      console.log(`Printable format:\n${entity.toPrintableFormat()}`);
      console.log(`HTML format: ${entity.toHtml().split('\n').map(line => line.trim()).join('')}`);
    }
    
    // Searchable interface
    if (entity instanceof User || entity instanceof Resource) {
      console.log(`Search terms: ${entity.getSearchTerms().join(', ')}`);
    }
    
    // Serializable mixin
    if (entity.toJson) {
      console.log(`JSON: ${entity.toJson().substring(0, 50)}...`);
    }
    
    console.log(`Tags: ${[...entity.tags].join(', ')}`);
  }
}

module.exports = {
  Entity,
  Searchable,
  Printable,
  Named,
  Serializable,
  User,
  BaseResource,
  Resource,
  Document,
  Image,
  GuestUser,
  AdminUser
}; 