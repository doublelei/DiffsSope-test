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


class Printable(ABC):
    """Interface for objects that can be printed."""
    
    @abstractmethod
    def to_printable_format(self) -> str:
        """Convert to a printable format."""
        pass


class Named(ABC):
    """Interface for objects that have a name attribute."""
    
    @abstractmethod
    def get_display_name(self) -> str:
        """Get the display name for this object."""
        pass


class User(Entity, Named):
    """Represents a user in the system."""
    
    def __init__(self, id: str, name: str, email: str, role: str = "standard"):
        super().__init__(id, name)
        self.email = email
        self.role = role
        self.permissions = set()
        
    def add_permission(self, permission: str) -> None:
        """Add a permission to this user."""
        self.permissions.add(permission)
        
    def has_permission(self, permission: str) -> bool:
        """Check if this user has the specified permission."""
        return permission in self.permissions
    
    def get_display_name(self) -> str:
        """Get the display name for this user."""
        return f"{self.name} ({self.email})"


class Resource(Entity, Named, Printable):
    """Represents a resource in the system."""
    
    def __init__(self, id: str, name: str, owner_id: str, resource_type: str):
        super().__init__(id, name)
        self.owner_id = owner_id
        self.resource_type = resource_type
        self.data = {}
        
    def update_data(self, key: str, value: Any) -> None:
        """Update a data field for this resource."""
        self.data[key] = value
        
    def get_data(self, key: str, default: Any = None) -> Any:
        """Get a data field from this resource."""
        return self.data.get(key, default)
    
    def get_display_name(self) -> str:
        """Get the display name for this resource."""
        return f"{self.name} ({self.resource_type})"
    
    def to_printable_format(self) -> str:
        """Convert to a printable format."""
        return f"Resource: {self.name}\nType: {self.resource_type}\nOwner: {self.owner_id}\nData: {self.data}"


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


class AdminUser(User):
    """Represents an admin user with extended permissions."""
    
    def __init__(self, id: str, name: str, email: str):
        super().__init__(id, name, email, role="admin")
        # Default admin permissions
        self.add_permission("create_user")
        self.add_permission("delete_user")
        self.add_permission("edit_resource")
        
    def can_manage_users(self) -> bool:
        """Check if this admin can manage users."""
        return self.has_permission("create_user") and self.has_permission("delete_user")
        
    def get_display_name(self) -> str:
        """Get the display name for this admin."""
        return f"Admin: {self.name} ({self.email})"


# Demo usage
if __name__ == "__main__":
    # Create an admin user
    admin = AdminUser("admin1", "Admin User", "admin@example.com")
    admin.add_tag("administrator")
    
    # Create a standard user
    user = User("user1", "Standard User", "user@example.com")
    user.add_tag("beta-tester")
    
    # Create a document
    doc = Document("doc1", "Important Document", "user1", "This is an important document")
    doc.add_tag("important")
    
    # Create an image
    img = Image("img1", "Profile Photo", "user1", 1200, 800)
    img.add_tag("profile")
    
    # Demonstrate hierarchy
    entities = [admin, user, doc, img]
    for entity in entities:
        print(f"\n{entity}")
        
        if isinstance(entity, Named):
            print(f"Display name: {entity.get_display_name()}")
            
        if isinstance(entity, Printable):
            print(f"Printable format:\n{entity.to_printable_format()}")
            
        print(f"Tags: {', '.join(entity.tags)}") 