#!/bin/bash

# Auth Service API Testing Script
BASE_URL="http://localhost:8081/api/auth"

echo "=========================================="
echo "Auth Service API Testing"
echo "=========================================="
echo ""

# 1. Health Check
echo "1. Testing Health Check..."
curl -s -X GET "${BASE_URL}/health"
echo -e "\n"

# 2. Register a new user
echo "2. Testing User Registration..."
REGISTER_RESPONSE=$(curl -s -X POST "${BASE_URL}/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }')
echo $REGISTER_RESPONSE | jq '.'
TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.token')
echo "Received Token: $TOKEN"
echo ""

# 3. Login with the user
echo "3. Testing User Login..."
LOGIN_RESPONSE=$(curl -s -X POST "${BASE_URL}/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }')
echo $LOGIN_RESPONSE | jq '.'
LOGIN_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')
echo ""

# 4. Validate Token
echo "4. Testing Token Validation..."
curl -s -X POST "${BASE_URL}/validate" \
  -H "Content-Type: application/json" \
  -d "{
    \"token\": \"$LOGIN_TOKEN\"
  }" | jq '.'
echo ""

# 5. Test with wrong credentials
echo "5. Testing Login with Wrong Password..."
curl -s -X POST "${BASE_URL}/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "wrongpassword"
  }' | jq '.'
echo ""

# 6. Try to register duplicate username
echo "6. Testing Duplicate Username Registration..."
curl -s -X POST "${BASE_URL}/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "another@example.com",
    "password": "password123"
  }' | jq '.'
echo ""

echo "=========================================="
echo "Testing Complete!"
echo "=========================================="
