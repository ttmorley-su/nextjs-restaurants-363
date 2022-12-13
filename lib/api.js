const API_URL = process.env.WORDPRESS_API_URL

export async function request(query, variables = {}) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
    }).then((resp) => resp.json());

    if (response.errors) {
        throw new Error(response.errors[0].message);
    }

    return response.data;
}

export async function getAllRestaurants() {
    const data = await request(`
        query NewQuery {
            restaurants {
                edges {
                    node {
                        id
                        title
                        excerpt
                        slug
                        featuredImage {
                              node {
                                    mediaItemUrl
                                    altText
                                    mediaDetails {
                                          width
                                          height
                                    }
                              }
                        }
                        restaurantTypes {
                            edges {
                                node {
                                    id
                                    name
                                }
                            }
                        }
                    }
                }
            }
        }
    `)
    return data?.restaurants.edges;
}

export async function getAllCategories() {
    const data = await request(`
        query NewQuery {
            restaurantTypes {
                edges {
                    node {
                        name
                    }
                }
            }
        }
    `);
    if (!data) return [];
    let edges = data.restaurantTypes?.edges;
    for (let i = 0, length = edges.length; i < length; i++) {
        edges[i] = edges[i].node.name;
    }
    edges.sort();
    edges.unshift("Categories");
    return edges;
}

export async function getAllRestaurantSlugs() {
    const data = await request(`
        query NewQuery {
          restaurants {
            edges {
              node {
                slug
              }
            }
          }
        }
    `);
    return data?.restaurants?.edges ?? [];
}

export async function getRestaurant(id) {
    const data = await request(`
        query MyQuery($id: ID!) {
            restaurant(idType: URI, id: $id) {
				id
				title
				slug
				excerpt
				restaurantTypes {
					nodes {
						name
					}
				}
				restaurantFields {
					phoneNumber
					emailAddress
					map
					hoursMonday
					hoursTuesday
					hoursWednesday
					hoursThursday
					hoursFriday
					hoursSaturday
					hoursSunday
				}
				featuredImage {
					node {
						mediaItemUrl
						altText
						mediaDetails {
							width
							height
						}
					}
				}
				menuItems {
					menuItems {
						menuItem {
							title
							price
							description
							image {
								mediaItemUrl
								altText
								mediaDetails {
									width
									height
								}
							}
						}
					}
				}
            }
        }
        `,
    { id });
    return data?.restaurant;
}

