import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Blog related functions
export const fetchBlogPosts = async () => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    throw new Error('Failed to fetch blog posts');
  }
};

export const fetchBlogPost = async (title) => {
  try {
    if (!title) {
      throw new Error('Invalid title provided');
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .ilike('title', `%${title}%`)
      .maybeSingle();

    if (error) {
      throw new Error('Failed to fetch blog post');
    }

    if (!data) {
      throw new Error('Blog post not found');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const createBlogPost = async (postData) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([postData])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error('Failed to create blog post');
  }
};

export const updateBlogPost = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error('Failed to update blog post');
  }
};

export const deleteBlogPost = async (id) => {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    throw new Error('Failed to delete blog post');
  }
};
