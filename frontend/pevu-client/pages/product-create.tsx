import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../store/auth';
import { createProduct, ProductCreateRequest } from '../api/products';
import { uploadProductImages, uploadProductVideo } from '../api/media';
import toast from 'react-hot-toast';
import ProductSpecificationsForm, { ProductSpecs, formatSpecifications } from '../components/ProductSpecificationsForm';

const categories = [
  'Phones and Tablets',
  'TVs and Audio',
  'Health and Beauty',
  'Fashion',
  'Computing',
];

const subcategories = {
  'Phones and Tablets': [
    'MOBILE PHONES',
    'ACCESSORIES',
    'TABLETS'
  ],
  'TVs and Audio': [
    'TELEVISIONS',
    'HOME AUDIO',
    'ACCESSORIES and SUPPLIES',
    'BRAND'
  ],
  'Health and Beauty': [
    'FACIAL SKIN CARE',
    'HAIR CARE',
    'MAKEUP',
    'HEALTH and WELLNESS',
    'PERSONAL CARE',
    'FRAGRANCES',
    'LUXURY BEAUTY'
  ],
  'Fashion': [
    "MEN'S CLOTHING",
    "MEN'S SHOES",
    "MEN'S ACCESSORIES",
    "WOMEN'S CLOTHING",
    "WOMEN'S ACCESSORIES",
    "WOMEN'S SHOES",
    "KID'S FASHION",
    'BRAND'
  ],
  'Computing': [
    'LAPTOPS',
    'COMPUTERS and ACCESSORIES',
    'COMPUTER DATA STORAGE',
    'COMPUTER COMPONENTS',
    'BRANDS'
  ]
};

// Brand subcategories for different main categories
const brandSubcategories: Record<string, string[]> = {
  'Phones and Tablets - MOBILE PHONES': [
    'Samsung',
    'Techno',
    'Xiaomi',
    'Infinix',
    'Vivo',
    'Oppo'
  ],
  'Phones and Tablets - TABLETS': [
    'Samsung',
    'Techno',
    'Xiaomi',
    'Infinix',
    'Vivo',
    'Oppo'
  ],
  'Phones and Tablets - ACCESSORIES': [
    'Samsung',
    'Techno',
    'Xiaomi',
    'Infinix',
    'Vivo',
    'Oppo'
  ],
  'TVs and Audio - TELEVISIONS': [
    'Vitron',
    'Hikers',
    'Skyworth',
    'Vision Plus',
    'Hisense TV',
    'Amtec',
    'TCL TV',
    'Royal',
    'GLD'
  ],
  'TVs and Audio - HOME AUDIO': [
    'Vitron',
    'Hikers',
    'Skyworth',
    'Vision Plus',
    'Hisense TV',
    'Amtec',
    'TCL TV',
    'Royal',
    'GLD'
  ],
  'TVs and Audio - ACCESSORIES and SUPPLIES': [
    'Vitron',
    'Hikers',
    'Skyworth',
    'Vision Plus',
    'Hisense TV',
    'Amtec',
    'TCL TV',
    'Royal',
    'GLD'
  ],
  'TVs and Audio - BRAND': [
    'Vitron',
    'Hikers',
    'Skyworth',
    'Vision Plus',
    'Hisense TV',
    'Amtec',
    'TCL TV',
    'Royal',
    'GLD'
  ],
  'Fashion - MEN\'S CLOTHING': [
    'Adidas',
    'Levi\'s',
    'Curren',
    'Forever Young',
    'Bata',
    'Reebok'
  ],
  'Fashion - MEN\'S SHOES': [
    'Adidas',
    'Levi\'s',
    'Curren',
    'Forever Young',
    'Bata',
    'Reebok'
  ],
  'Fashion - MEN\'S ACCESSORIES': [
    'Adidas',
    'Levi\'s',
    'Curren',
    'Forever Young',
    'Bata',
    'Reebok'
  ],
  'Fashion - WOMEN\'S CLOTHING': [
    'Adidas',
    'Levi\'s',
    'Curren',
    'Forever Young',
    'Bata',
    'Reebok'
  ],
  'Fashion - WOMEN\'S ACCESSORIES': [
    'Adidas',
    'Levi\'s',
    'Curren',
    'Forever Young',
    'Bata',
    'Reebok'
  ],
  'Fashion - WOMEN\'S SHOES': [
    'Adidas',
    'Levi\'s',
    'Curren',
    'Forever Young',
    'Bata',
    'Reebok'
  ],
  'Fashion - KID\'S FASHION': [
    'Adidas',
    'Levi\'s',
    'Curren',
    'Forever Young',
    'Bata',
    'Reebok'
  ],
  'Fashion - BRAND': [
    'Adidas',
    'Levi\'s',
    'Curren',
    'Forever Young',
    'Bata',
    'Reebok'
  ],
  'Computing - LAPTOPS': [
    'HP Laptops',
    'Dell Laptops',
    'Lenovo Laptops',
    'Apple Laptops',
    'Asus Laptops'
  ],
  'Computing - COMPUTERS and ACCESSORIES': [
    'HP Laptops',
    'Dell Laptops',
    'Lenovo Laptops',
    'Apple Laptops',
    'Asus Laptops'
  ],
  'Computing - COMPUTER DATA STORAGE': [
    'HP Laptops',
    'Dell Laptops',
    'Lenovo Laptops',
    'Apple Laptops',
    'Asus Laptops'
  ],
  'Computing - COMPUTER COMPONENTS': [
    'HP Laptops',
    'Dell Laptops',
    'Lenovo Laptops',
    'Apple Laptops',
    'Asus Laptops'
  ],
  'Computing - BRANDS': [
    'HP Laptops',
    'Dell Laptops',
    'Lenovo Laptops',
    'Apple Laptops',
    'Asus Laptops'
  ]
};

export default function ProductCreate() {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [structuredSpecs, setStructuredSpecs] = useState<ProductSpecs | null>(null);
  const [price, setPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('1');
  const [category, setCategory] = useState('Phones and Tablets');
  const [subcategory, setSubcategory] = useState('');
  const [brand, setBrand] = useState('');
  const [attributes, setAttributes] = useState<Record<string, string>>({});
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | undefined>(undefined);
  const [videoType, setVideoType] = useState<string | undefined>(undefined);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  if (!user || user.role !== 'SELLER') return <div className="p-8">Only sellers can create products.</div>;

  // Update subcategory when category changes
  React.useEffect(() => {
    const availableSubcategories = subcategories[category as keyof typeof subcategories];
    if (availableSubcategories.length > 0) {
      setSubcategory(availableSubcategories[0]);
    } else {
      setSubcategory('');
    }
    setBrand(''); // Reset brand when category changes
  }, [category]);

  // Reset brand when subcategory changes
  React.useEffect(() => {
    setBrand(''); // Reset brand when subcategory changes
  }, [subcategory]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const handleAttributeChange = (key: string, value: string) => {
    setAttributes(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const addAttribute = () => {
    const newKey = `attribute_${Object.keys(attributes).length + 1}`;
    setAttributes(prev => ({
      ...prev,
      [newKey]: ''
    }));
  };

  const removeAttribute = (key: string) => {
    setAttributes(prev => {
      const newAttrs = { ...prev };
      delete newAttrs[key];
      return newAttrs;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate required fields
      if (!title || !price || !category || !details || !structuredSpecs) {
        throw new Error('Please fill in all required fields');
      }

      // Validate that at least one media type is uploaded (images OR video)
      if (images.length === 0 && !video) {
        throw new Error('Please upload at least one image or video.');
      }

      const priceValue = parseFloat(price);
      if (isNaN(priceValue) || priceValue < 0) {
        throw new Error('Please enter a valid price');
      }

      const quantityValue = parseInt(productQuantity);
      if (isNaN(quantityValue) || quantityValue < 1) {
        throw new Error('Please enter a valid quantity (minimum 1)');
      }

      // Upload images
      const imageUrls: string[] = [];
      if (images.length > 0) {
        const uploaded = await uploadProductImages(images);
        imageUrls.push(...uploaded.map((img) => img.url));
      }

      // Upload video if present
      let videoUrl: string | undefined;
      let uploadedVideoType: string | undefined;
      let uploadedDuration: number | undefined;
      if (video) {
        const uploaded = await uploadProductVideo(video);
        videoUrl = uploaded.url;
        uploadedVideoType = uploaded.videoType;
        uploadedDuration = uploaded.duration;
        setVideoDuration(uploadedDuration);
        setVideoType(uploadedVideoType);
        // Enforce duration rules
        if (!uploadedDuration || uploadedDuration < 31 || uploadedDuration > 179) {
          throw new Error('Video must be more than 30 seconds and less than 180 seconds.');
        }
        if (!uploadedVideoType) {
          throw new Error('Video type could not be determined.');
        }
      }

      // Determine final category
      let finalCategory = category;
      if (subcategory) {
        finalCategory = `${category} - ${subcategory}`;
      }
      if (brand) {
        finalCategory = `${finalCategory} - ${brand}`;
      }

      // Filter out empty attributes
      const filteredAttributes = Object.fromEntries(
        Object.entries(attributes).filter(([_, value]) => value.trim() !== '')
      );

      const req = {
        title,
        details,
        specifications: structuredSpecs.specifications,
        price: priceValue,
        category: finalCategory,
        majorCategory: category,
        subcategory,
        brand,
        productQuantity: quantityValue,
        sellerId: user.id,
        images: imageUrls,
        videos: videoUrl ? [videoUrl] : [],
        videoDuration: uploadedDuration,
        videoType: uploadedVideoType,
        attributes: filteredAttributes,
      };
      await createProduct(req);
      setSuccess('Product created!');
      toast.success('Product created!');
      router.push('/');
    } catch (err: any) {
      let message = 'Failed to create product';
      if (err?.response?.status === 413) {
        message = 'File too large. Maximum allowed is 100MB.';
      } else if (err?.response?.data?.message) {
        message = err.response.data.message;
      } else if (err?.response?.data?.error) {
        message = err.response.data.error;
      } else if (err?.message) {
        message = err.message;
      }
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Check if media validation is satisfied
  const hasMedia = images.length > 0 || video;
  const isValidPrice = Number(price) >= 0;
  const isValidQuantity = Number(productQuantity) >= 1;

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Title *</label>
            <input
              type="text"
              placeholder="Enter product title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={255}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <div className="text-xs text-gray-500 mt-1 text-right">
              {title.length}/255 characters
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price (KSH) *</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500 font-semibold">Ksh</span>
              <input
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`w-full border p-3 pl-12 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  price && !isValidPrice ? 'border-red-500' : 'border-gray-300'
                }`}
                min="0"
                step="0.01"
                required
              />
            </div>
            {price && !isValidPrice && (
              <p className="text-red-500 text-sm mt-1">Price cannot be negative</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
            <input
              type="number"
              placeholder="1"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                productQuantity && !isValidQuantity ? 'border-red-500' : 'border-gray-300'
              }`}
              min="1"
              required
            />
            {productQuantity && !isValidQuantity && (
              <p className="text-red-500 text-sm mt-1">Quantity must be at least 1</p>
            )}
          </div>
        </div>

        {/* Category Selection Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory *</label>
            {subcategories[category as keyof typeof subcategories].length > 0 ? (
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                {subcategories[category as keyof typeof subcategories].map((subcat) => (
                  <option key={subcat} value={subcat}>{subcat}</option>
                ))}
              </select>
            ) : (
              <div className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 text-gray-500">
                No subcategories available
              </div>
            )}
          </div>
        </div>

        {/* Brand Selection Row - Show for Phones and Tablets, TVs and Audio, Fashion, and Computing */}
        {(category === 'Phones and Tablets' || category === 'TVs and Audio' || category === 'Fashion' || category === 'Computing') && subcategory && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
              {(() => {
                const categoryKey = `${category} - ${subcategory}`;
                const availableBrands = brandSubcategories[categoryKey];
                return availableBrands && availableBrands.length > 0 ? (
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a brand</option>
                    {availableBrands.map((brandOption) => (
                      <option key={brandOption} value={brandOption}>{brandOption}</option>
                    ))}
                  </select>
                ) : (
                  <div className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 text-gray-500">
                    No brands available for this category
                  </div>
                );
              })()}
            </div>
            <div></div> {/* Empty div for grid layout */}
          </div>
        )}

        {/* Product Information Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Details *</label>
            <textarea
              placeholder="Describe your product details..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              maxLength={1000}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              required
            />
            <div className="text-xs text-gray-500 mt-1 text-right">
              {details.length}/1000 characters
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Specifications *</label>
            <ProductSpecificationsForm value={structuredSpecs || undefined} onChange={setStructuredSpecs} />
            <div className="text-xs text-gray-500 mt-1 text-right">
              {(structuredSpecs?.specifications || '').length}/1000 characters
            </div>
          </div>
        </div>

        {/* Product Attributes Row */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700">Product Attributes (Optional)</label>
            <button
              type="button"
              onClick={addAttribute}
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
            >
              + Add Attribute
            </button>
          </div>
          <div className="space-y-3">
            {Object.entries(attributes).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-3">
                <input
                  type="text"
                  placeholder="Attribute name (e.g. Color, Size, Material)"
                  value={key}
                  onChange={(e) => {
                    const newKey = e.target.value;
                    const newAttributes = { ...attributes };
                    delete newAttributes[key];
                    newAttributes[newKey] = value;
                    setAttributes(newAttributes);
                  }}
                  className="flex-1 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={value}
                  onChange={(e) => handleAttributeChange(key, e.target.value)}
                  className="flex-1 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeAttribute(key)}
                  className="text-red-600 hover:text-red-800 p-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
            {Object.keys(attributes).length === 0 && (
              <div className="text-gray-500 text-sm italic">
                No attributes added yet. Click "Add Attribute" to add custom product attributes like Color, Size, Material, etc.
              </div>
            )}
          </div>
        </div>

        {/* Media Upload Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images {images.length > 0 ? `(${images.length} selected)` : ''}
            </label>
            <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              images.length > 0 
                ? 'border-green-400 bg-green-50' 
                : 'border-gray-300 hover:border-blue-400'
            }`}>
              <input 
                type="file" 
                accept="image/*" 
                multiple 
                ref={imageInputRef} 
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="text-gray-500">
                  <svg className="mx-auto h-12 w-12 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-sm">Click to upload images</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP up to 5MB each</p>
                </div>
              </label>
            </div>
            {images.length > 0 && (
              <div className="mt-2 text-sm text-green-600">
                ✓ {images.length} image{images.length > 1 ? 's' : ''} selected
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Video {video ? '(selected)' : ''}
            </label>
            <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              video 
                ? 'border-green-400 bg-green-50' 
                : 'border-gray-300 hover:border-blue-400'
            }`}>
              <input 
                type="file" 
                accept="video/*" 
                ref={videoInputRef} 
                onChange={handleVideoChange}
                className="hidden"
                id="video-upload"
              />
              <label htmlFor="video-upload" className="cursor-pointer">
                <div className="text-gray-500">
                  <svg className="mx-auto h-12 w-12 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-sm">Click to upload video</p>
                  <p className="text-xs text-gray-400 mt-1">MP4, MOV, WEBM up to 50MB</p>
                </div>
              </label>
            </div>
            {video && (
              <div className="mt-2 text-sm text-green-600">
                ✓ Video selected: {video.name}
              </div>
            )}
          </div>
        </div>

        {/* Media Requirement Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="h-5 w-5 text-blue-400 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-blue-700">
              <p className="font-medium">Media Requirement</p>
              <p>Your product must have at least one image or video. You can upload both if desired.</p>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button 
            type="submit" 
            className={`font-semibold py-3 px-8 rounded-lg transition-colors duration-200 ${
              hasMedia 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={loading || !hasMedia}
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Product...
              </div>
            ) : (
              hasMedia ? 'Create Product' : 'Upload at least one image or video'
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 