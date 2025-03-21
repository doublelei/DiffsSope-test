"""
Python test file for class hierarchy changes.

This file demonstrates class inheritance structures 
to test DiffScope's ability to detect changes in class hierarchies.
"""

from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional, Union, Set


class Entity:
    """Base class for all entities in the system."""
    
    def __init__(self, id: str, name: str):
        self.id = id
        self.name = name
        self.tags = set()
        self.created_at = None  # New field
    
    def add_tag(self, tag: str) -> None:
        """Add a tag to this entity."""
        self.tags.add(tag)
        
    def remove_tag(self, tag: str) -> bool:
        """Remove a tag from this entity if it exists."""
        if tag in self.tags:
            self.tags.remove(tag)
            return True
        return False
    
    def has_tag(self, tag: str) -> bool:
        """Check if this entity has the specified tag."""
        return tag in self.tags
    
    def __str__(self) -> str:
        return f"{self.__class__.__name__}(id={self.id}, name={self.name})"
    
    def __repr__(self) -> str:
        return self.__str__()


# New interface
class Searchable(ABC):
    """Interface for objects that can be searched."""
    
    @abstractmethod
    def get_search_terms(self) -> List[str]:
        """Get search terms for this object."""
        pass


class Printable(ABC):
    """Interface for objects that can be printed."""
    
    @abstractmethod
    def to_printable_format(self) -> str:
        """Convert to a printable format."""
        pass
    
    # New method
    @abstractmethod
    def to_html(self) -> str:
        """Convert to HTML format."""
        pass


class Named(ABC):
    """Interface for objects that have a name attribute."""
    
    @abstractmethod
    def get_display_name(self) -> str:
        """Get the display name for this object."""
        pass


# Modified inheritance
class User(Entity, Named, Searchable):  # Added Searchable
    """Represents a user in the system."""
    
    def __init__(self, id: str, name: str, email: str, role: str = "standard"):
        super().__init__(id, name)
        self.email = email
        self.role = role
        self.permissions = set()
        self.last_login = None  # New field
        
    def add_permission(self, permission: str) -> None:
        """Add a permission to this user."""
        self.permissions.add(permission)
        
    def has_permission(self, permission: str) -> bool:
        """Check if this user has the specified permission."""
        return permission in self.permissions
    
    def get_display_name(self) -> str:
        """Get the display name for this user."""
        return f"{self.name} ({self.email})"
    
    # Implement Searchable
    def get_search_terms(self) -> List[str]:
        """Get search terms for this user."""
        return [self.id, self.name, self.email, self.role]


# New base class for resources
class BaseResource(Entity):
    """Base class for all resources."""
    
    def __init__(self, id: str, name: str, owner_id: str):
        super().__init__(id, name)
        self.owner_id = owner_id
        self.data = {}
    
    def update_data(self, key: str, value: Any) -> None:
        """Update a data field for this resource."""
        self.data[key] = value
        
    def get_data(self, key: str, default: Any = None) -> Any:
        """Get a data field from this resource."""
        return self.data.get(key, default)


# Modified inheritance
class Resource(BaseResource, Named, Printable, Searchable):  # Changed to extend BaseResource, added Searchable
    """Represents a resource in the system."""
    
    def __init__(self, id: str, name: str, owner_id: str, resource_type: str):
        super().__init__(id, name, owner_id)
        self.resource_type = resource_type
        
    def get_display_name(self) -> str:
        """Get the display name for this resource."""
        return f"{self.name} ({self.resource_type})"
    
    def to_printable_format(self) -> str:
        """Convert to a printable format."""
        return f"Resource: {self.name}\nType: {self.resource_type}\nOwner: {self.owner_id}\nData: {self.data}"
    
    # Implement abstract method
    def to_html(self) -> str:
        """Convert to HTML format."""
        return f"<div class='resource'><h2>{self.name}</h2><p>Type: {self.resource_type}</p></div>"
    
    # Implement Searchable
    def get_search_terms(self) -> List[str]:
        """Get search terms for this resource."""
        return [self.id, self.name, self.resource_type]


class Document(Resource):
    """Represents a document resource."""
    
    def __init__(self, id: str, name: str, owner_id: str, content: str = ""):
        super().__init__(id, name, owner_id, "document")
        self.content = content
        self.version = 1
        
    def update_content(self, new_content: str) -> None:
        """Update the document content."""
        self.content = new_content
        self.version += 1
        
    def to_printable_format(self) -> str:
        """Convert to a printable format."""
        base_format = super().to_printable_format()
        return f"{base_format}\nVersion: {self.version}\nContent: {self.content[:50]}..."
    
    # Override the HTML format
    def to_html(self) -> str:
        """Convert to HTML format."""
        return f"""
        <div class='document'>
            <h2>{self.name}</h2>
            <p>Version: {self.version}</p>
            <div class='content'>{self.content[:100]}...</div>
        </div>
        """
    
    # Override search terms
    def get_search_terms(self) -> List[str]:
        """Get search terms for this document."""
        terms = super().get_search_terms()
        # Add content as search term
        terms.append(self.content)
        return terms


class Image(Resource):
    """Represents an image resource."""
    
    def __init__(self, id: str, name: str, owner_id: str, width: int, height: int, format: str = "png"):
        super().__init__(id, name, owner_id, "image")
        self.width = width
        self.height = height
        self.format = format
        
    def to_printable_format(self) -> str:
        """Convert to a printable format."""
        base_format = super().to_printable_format()
        return f"{base_format}\nDimensions: {self.width}x{self.height}\nFormat: {self.format}"
    
    # Override the HTML format
    def to_html(self) -> str:
        """Convert to HTML format."""
        return f"""
        <div class='image'>
            <h2>{self.name}</h2>
            <p>Dimensions: {self.width}x{self.height}</p>
            <p>Format: {self.format}</p>
            <img src="placeholder.jpg" alt="{self.name}" />
        </div>
        """


# New class
class GuestUser(User):
    """Represents a guest user with limited permissions."""
    
    def __init__(self, id: str, name: str = "Guest"):
        super().__init__(id, name, f"guest_{id}@example.com", role="guest")
    
    def get_display_name(self) -> str:
        """Get the display name for this guest."""
        return f"Guest: {self.name}"


# Modified class
class AdminUser(User):
    """Represents an admin user with extended permissions."""
    
    def __init__(self, id: str, name: str, email: str, admin_level: int = 1):  # Added admin_level
        super().__init__(id, name, email, role="admin")
        self.admin_level = admin_level  # New field
        # Default admin permissions
        self.add_permission("create_user")
        self.add_permission("delete_user")
        self.add_permission("edit_resource")
        
        # Higher level admins get more permissions
        if admin_level >= 2:
            self.add_permission("manage_roles")
            self.add_permission("view_logs")
        
        if admin_level >= 3:
            self.add_permission("system_config")
        
    def can_manage_users(self) -> bool:
        """Check if this admin can manage users."""
        return self.has_permission("create_user") and self.has_permission("delete_user")
        
    def get_display_name(self) -> str:
        """Get the display name for this admin."""
        return f"Admin(L{self.admin_level}): {self.name} ({self.email})"


# Demo usage
if __name__ == "__main__":
    # Create an admin user
    admin = AdminUser("admin1", "Admin User", "admin@example.com", admin_level=2)
    admin.add_tag("administrator")
    
    # Create a standard user
    user = User("user1", "Standard User", "user@example.com")
    user.add_tag("beta-tester")
    
    # Create a guest user
    guest = GuestUser("guest1")
    guest.add_tag("temporary")
    
    # Create a document
    doc = Document("doc1", "Important Document", "user1", "This is an important document")
    doc.add_tag("important")
    
    # Create an image
    img = Image("img1", "Profile Photo", "user1", 1200, 800)
    img.add_tag("profile")
    
    # Demonstrate hierarchy
    entities = [admin, user, guest, doc, img]
    for entity in entities:
        print(f"\n{entity}")
        
        if isinstance(entity, Named):
            print(f"Display name: {entity.get_display_name()}")
            
        if isinstance(entity, Printable):
            print(f"Printable format:\n{entity.to_printable_format()}")
            
        if isinstance(entity, Searchable):
            print(f"Search terms: {', '.join(entity.get_search_terms())}")
            
        print(f"Tags: {', '.join(entity.tags)}") 