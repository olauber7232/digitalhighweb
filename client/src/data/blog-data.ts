export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  status: "draft" | "published";
  image: string;
  readTime: string;
  views?: number;
}

// API functions for blog management
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch('/api/blogs?published=true');
    if (!response.ok) throw new Error('Failed to fetch blog posts');
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch('/api/blogs');
    if (!response.ok) throw new Error('Failed to fetch all blog posts');
    return await response.json();
  } catch (error) {
    console.error('Error fetching all blog posts:', error);
    return [];
  }
};

export const getBlogPost = async (id: number): Promise<BlogPost | undefined> => {
  try {
    const response = await fetch(`/api/blogs/${id}`);
    if (!response.ok) {
      if (response.status === 404) return undefined;
      throw new Error('Failed to fetch blog post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return undefined;
  }
};

export const createBlogPost = async (post: Omit<BlogPost, "id">): Promise<BlogPost> => {
  try {
    const response = await fetch('/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) throw new Error('Failed to create blog post');
    return await response.json();
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
};

export const updateBlogPost = async (id: number, updates: Partial<BlogPost>): Promise<BlogPost | null> => {
  try {
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to update blog post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating blog post:', error);
    return null;
  }
};

export const deleteBlogPost = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
};

export const getBlogStats = async () => {
  try {
    const response = await fetch('/api/blogs/stats');
    if (!response.ok) throw new Error('Failed to fetch blog stats');
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog stats:', error);
    return {
      total: 0,
      published: 0,
      draft: 0,
      totalViews: 0
    };
  }
};