"use client";
import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
   
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowRight, 
  BarChart, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  MessageSquare, 
  Tag, 
  Percent,
  Layers,
  Target,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const categories = [
  "Farm",
  "Agriculture",
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Retail",
  "Manufacturing",
  "Real Estate",
  "Other"
];

// Subcategories mapping
const subcategories = {
  "Farm": ["Livestock", "Crops", "Dairy", "Organic", "Equipment"],
  "Agriculture": ["Seeds", "Fertilizers", "Irrigation", "Farming Tools", "Pesticides"],
  "Technology": ["Software", "Hardware", "IT Services", "Cybersecurity", "Cloud Computing"],
  "Finance": ["Banking", "Insurance", "Investment", "Accounting", "Lending"],
  "Healthcare": ["Hospitals", "Pharmaceuticals", "Medical Devices", "Telemedicine", "Mental Health"],
  "Education": ["K-12", "Higher Education", "EdTech", "Professional Training", "Language Learning"],
  "Retail": ["Apparel", "Electronics", "Grocery", "Home Goods", "E-commerce"],
  "Manufacturing": ["Automotive", "Electronics", "Food Processing", "Textiles", "Chemical"],
  "Real Estate": ["Residential", "Commercial", "Industrial", "Land", "Property Management"],
  "Other": ["Consulting", "Travel", "Energy", "Media", "Entertainment"]
};

interface FormData {
  description: string;
  category: string;
  subcategory: string;
}

interface AnalysisResults {
  score: number;
  sentiment: string;
  categoryMatch: number;
  analysis: string;
}

export default function LeadScoringForm() {
  const [formData, setFormData] = useState<FormData>({
    description: '',
    category: '',
    subcategory: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/gemini/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze lead');
      }
      
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error analyzing lead:', error);
      setError(error instanceof Error ? error.message : 'Failed to analyze lead. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Determine score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-500";
    if (score >= 5) return "text-yellow-500";
    return "text-red-500";
  };

  // Determine sentiment badge color
  const getSentimentBadge = (sentiment: string) => {
    if (!sentiment) return null;
    
    const sentimentLower = sentiment.toLowerCase();
    if (sentimentLower.includes('positive')) {
      return <Badge className="bg-green-500 hover:bg-green-600">{sentiment}</Badge>;
    } else if (sentimentLower.includes('negative')) {
      return <Badge className="bg-red-500 hover:bg-red-600">{sentiment}</Badge>;
    } else {
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">{sentiment}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Lead Scoring System
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Leverage AI to analyze and score your leads for better conversion rates and targeted marketing
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        <div className="grid md:grid-cols-5 gap-6">
          <Card className="md:col-span-2 shadow-lg border border-gray-200 hover:border-purple-300 transition-all duration-300">
            <CardHeader className="space-y-1 bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg pb-4">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-8 w-8 text-purple-500" />
              </div>
              <CardTitle className="text-xl font-bold text-center">Lead Analysis</CardTitle>
              <CardDescription className="text-center">
                Enter lead details for AI-powered insights
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 text-purple-500 mr-2" />
                    <Label htmlFor="description" className="font-medium">
                      Lead Description
                    </Label>
                  </div>
                  <Textarea
                    id="description"
                    placeholder="Enter detailed information about the lead..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    className="min-h-32 resize-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 text-purple-500 mr-2" />
                      <Label htmlFor="category" className="font-medium">
                        Category
                      </Label>
                    </div>
                    <Select 
                      value={formData.category}
                      onValueChange={(value) => setFormData({
                        ...formData, 
                        category: value,
                        subcategory: '' // Reset subcategory when category changes
                      })}
                      required
                    >
                      <SelectTrigger className="w-full focus:ring-purple-500">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Layers className="h-4 w-4 text-purple-500 mr-2" />
                      <Label htmlFor="subcategory" className="font-medium">
                        Subcategory
                      </Label>
                    </div>
                    <Select 
                      value={formData.subcategory}
                      onValueChange={(value) => setFormData({...formData, subcategory: value})}
                      disabled={!formData.category}
                    >
                      <SelectTrigger className="w-full focus:ring-purple-500">
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.category && subcategories[formData.category as keyof typeof subcategories]?.map((subcat) => (
                          <SelectItem key={subcat} value={subcat}>
                            {subcat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full font-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Analyze Lead
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {results ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-3"
            >
              <Card className="shadow-lg border border-gray-200 hover:border-purple-300 transition-all duration-300 h-full">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg pb-4">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-8 w-8 text-purple-500" />
                  </div>
                  <CardTitle className="text-xl font-bold text-center">Analysis Results</CardTitle>
                  <CardDescription className="text-center">
                    {formData.subcategory 
                      ? `AI insights for ${formData.category} › ${formData.subcategory}`
                      : `AI insights for ${formData.category}`
                    }
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Lead Score */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="text-sm text-gray-500 mb-1 flex items-center">
                        <BarChart className="h-4 w-4 mr-1 text-purple-500" />
                        Lead Score
                      </div>
                      <div className={`text-3xl font-bold ${getScoreColor(results.score)}`}>
                        {results.score}/10
                      </div>
                      <Progress 
                        value={results.score * 10} 
                        className="h-1.5 mt-2"
                        style={{
                          background: 'linear-gradient(to right, #f8f1ff, #fef1f9)',
                          backgroundSize: '100%'
                        }}
                      />
                    </div>

                    {/* Sentiment */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="text-sm text-gray-500 mb-1 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1 text-purple-500" />
                        Sentiment
                      </div>
                      <div className="text-xl font-medium mt-2">
                        {getSentimentBadge(results.sentiment)}
                      </div>
                    </div>

                    {/* Category Match */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="text-sm text-gray-500 mb-1 flex items-center">
                        <Percent className="h-4 w-4 mr-1 text-purple-500" />
                        Category Match
                      </div>
                      <div className="text-3xl font-bold text-indigo-600">
                        {results.categoryMatch}%
                      </div>
                      <Progress 
                        value={results.categoryMatch} 
                        className="h-1.5 mt-2"
                        style={{
                          background: 'linear-gradient(to right, #f8f1ff, #fef1f9)',
                          backgroundSize: '100%'
                        }}
                      />
                    </div>
                  </div>

                  <Separator className="my-4" />
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-purple-500" />
                      <Label className="font-medium">Detailed Analysis</Label>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 text-gray-700 leading-relaxed">
                      {results.analysis}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Card className={`p-4 border-l-4 ${
                      results.score >= 7 
                        ? "border-l-green-500 bg-green-50" 
                        : results.score >= 4 
                          ? "border-l-yellow-500 bg-yellow-50" 
                          : "border-l-red-500 bg-red-50"
                    }`}>
                      <div className="flex items-start">
                        {results.score >= 7 ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        ) : results.score >= 4 ? (
                          <CheckCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <h3 className="font-medium">
                            {results.score >= 7 
                              ? "High-Quality Lead" 
                              : results.score >= 4 
                                ? "Moderate-Quality Lead" 
                                : "Low-Quality Lead"
                            }
                          </h3>
                          <p className="text-sm mt-1">
                            {results.score >= 7 
                              ? "This lead shows strong potential. Recommend immediate follow-up." 
                              : results.score >= 4 
                                ? "This lead shows moderate potential. Consider scheduled follow-up." 
                                : "This lead shows limited potential. Consider automated nurturing."
                            }
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <div className="md:col-span-3 flex items-center justify-center">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.5 }}
                className="text-center p-12 text-gray-400"
              >
                <BarChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Submit your lead details to see analysis results</p>
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}