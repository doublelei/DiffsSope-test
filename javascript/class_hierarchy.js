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
 * Represents a user in the system.
 * @extends Entity
 * @implements Named
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
}

/**
 * Represents a resource in the system.
 * @extends Entity
 * @implements Named
 * @implements Printable
 */
class Resource extends Entity {
  /**
   * Create a new resource.
   * @param {string} id - Unique identifier
   * @param {string} name - Display name
   * @param {string} ownerId - Owner's ID
   * @param {string} resourceType - Type of resource
   */
  constructor(id, name, ownerId, resourceType) {
    super(id, name);
    this.ownerId = ownerId;
    this.resourceType = resourceType;
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
  }
  
  /**
   * Update the document content.
   * @param {string} newContent - New content
   */
  updateContent(newContent) {
    this.content = newContent;
    this.version++;
  }
  
  /**
   * Convert to a printable format.
   * @returns {string} Printable representation
   */
  toPrintableFormat() {
    const baseFormat = super.toPrintableFormat();
    return `${baseFormat}\nVersion: ${this.version}\nContent: ${this.content.substring(0, 50)}...`;
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
  }
  
  /**
   * Convert to a printable format.
   * @returns {string} Printable representation
   */
  toPrintableFormat() {
    const baseFormat = super.toPrintableFormat();
    return `${baseFormat}\nDimensions: ${this.width}x${this.height}\nFormat: ${this.format}`;
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
   */
  constructor(id, name, email) {
    super(id, name, email, "admin");
    // Default admin permissions
    this.addPermission("create_user");
    this.addPermission("delete_user");
    this.addPermission("edit_resource");
  }
  
  /**
   * Check if this admin can manage users.
   * @returns {boolean} True if admin can manage users
   */
  canManageUsers() {
    return this.hasPermission("create_user") && this.hasPermission("delete_user");
  }
  
  /**
   * Get the display name for this admin.
   * @returns {string} Display name
   */
  getDisplayName() {
    return `Admin: ${this.name} (${this.email})`;
  }
}

// Demo usage
if (require.main === module) {
  // Create an admin user
  const admin = new AdminUser("admin1", "Admin User", "admin@example.com");
  admin.addTag("administrator");
  
  // Create a standard user
  const user = new User("user1", "Standard User", "user@example.com");
  user.addTag("beta-tester");
  
  // Create a document
  const doc = new Document("doc1", "Important Document", "user1", "This is an important document");
  doc.addTag("important");
  
  // Create an image
  const img = new Image("img1", "Profile Photo", "user1", 1200, 800);
  img.addTag("profile");
  
  // Demonstrate hierarchy
  const entities = [admin, user, doc, img];
  for (const entity of entities) {
    console.log(`\n${entity}`);
    
    if (entity instanceof User || entity instanceof Resource) { // Both implement Named
      console.log(`Display name: ${entity.getDisplayName()}`);
    }
    
    if (entity instanceof Resource) { // Resources implement Printable
      console.log(`Printable format:\n${entity.toPrintableFormat()}`);
    }
    
    console.log(`Tags: ${[...entity.tags].join(', ')}`);
  }
}

module.exports = {
  Entity,
  Printable,
  Named,
  User,
  Resource,
  Document,
  Image,
  AdminUser
}; 