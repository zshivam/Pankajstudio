import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json({ success: false, error: 'API Key ya Place ID missing hai' }, { status: 400 });
  }

  try {
    // Google Places API ko call kiya
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.result && data.result.reviews) {
      // 🌟 Sirf wahi reviews jinme rating 4 ya 5 hai
      const goodReviews = data.result.reviews.filter(review => review.rating >= 4);
      return NextResponse.json({ success: true, reviews: goodReviews });
    }

    return NextResponse.json({ success: false, error: 'No reviews found' });
  } catch (error) {
    console.error("Google API Error:", error);
    return NextResponse.json({ success: false, error: 'Failed to fetch reviews' }, { status: 500 });
  }
}