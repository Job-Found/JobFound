import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'Accept': 'application/json'
    }
  }
});

// Blog related functions
export const fetchBlogPosts = async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const fetchBlogPost = async (slug) => {
  try {
    if (!slug) {
      throw new Error('Invalid slug provided');
    }

    console.log('Attempting to fetch blog post with slug:', slug);

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error('Failed to fetch blog post');
    }

    if (!data) {
      console.log('No post found for slug:', slug);
      throw new Error('Blog post not found');
    }

    console.log('Successfully fetched post:', data);
    return data;
  } catch (error) {
    console.error('Error in fetchBlogPost:', error);
    throw error;
  }
};

export const createBlogPost = async (postData) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([postData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateBlogPost = async (id, updates) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteBlogPost = async (id) => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};
