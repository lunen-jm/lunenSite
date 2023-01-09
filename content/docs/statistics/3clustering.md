---
title: "Hierarchical and K-Means Clustering"
description: "Doks is a Hugo theme for building secure, fast, and SEO-ready documentation websites, which you can easily update and customize."
lead: "Doks is a Hugo theme for building secure, fast, and SEO-ready documentation websites, which you can easily update and customize."
date: 2023-1-09T08:48:57+00:00
lastmod: 2023-1-09T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "statistics"
weight: 030
toc: true
---

Clustering is essentially figuring out what things are close together. Clustering organizes things that are close into groups. The main questions we want to ask are:

* How do we define close?
* How do we group things? 
* How do we visualize the grouping?
* How do we interpret the grouping?

# Introduction to Hierarchical Clustering

Hierarchical clustering takes an agglomerative approach that finds the two closest things, puts them together, and then finds the next closest. It requires a defined distance and a merging approach, and it produces a tree showing how close things are to eachother.

When defining "close", you need to make sure it is a good measure, otherwise it won't turn out well. Here are a few examples of distance methods:

* Continous - Euclidean distance: Straight line distance 
    * Scales well to higher dimension problems
    * `√((A1-A2)^2+(B1-B2)^2+...)`
* Continous - Correlation similarity: Analagous distance
* Binary - manhattan distance:
    * `|A1-A2|+|B1-B2|+...`

Think about the downtown of a city. You're trying to get from one building to another a few blocks away. The euclidean distance would be the way a bird would fly there. The Manhattan distance would be the distance if you had to stay on the sidewalk and go up and to the side of the city blocks.

To begin using hierarchical clustering (HC), you will need to find the `pairwise distances` for each of the points. One of the main functions we can use for HC is `dist()`, which makes a distance matrix of the dataframe input. The distance matrix shows all of the differences between the points.

Once you have the distance matrix, you can get a general idea of how far away the points all are from eachother. 

## Introductory Example

Here's an example of this in action:

```{r hc1}
set.seed(1234)
par(mar = c(0,0,0,0)) # setting global margins to 0
x <- rnorm(12, mean = rep(1:3, each = 4), sd = 0.2) # sets a different mean for each value, provides more variation. That means value 1 is a random value from the distribution of mean 1 and SD 0.2 (2 is 2, 3 is 3, 4 is 1, etc.)
x
y <- rnorm(12, mean = rep(c(1, 2, 1), each = 4), sd = 0.2)
plot(x, y, col = "blue", pch = 19, cex = 2) # making the plot
text(x + 0.05, y + 0.05, labels = as.character(1:12)) # adds a number to each point
dataFrame <- data.frame(x = x, y = y)
dist(dataFrame) # shows the distance matrix
```

Now that we have the distance matrix, we're going to start pairing the values together. Here is the chart again:

```{r hc2}
plot(x, y, col = "blue", pch = 19, cex = 2) + text(x + 0.05, y + 0.05, labels = as.character(1:12))
```

Based on the values in the distance matrix, we're going to visualize some pairs: `5+6` and `10+11`. Then, we will continue to merge points together. Here is the final tree next to the chart:

```{r hc3}
par(mfrow = c(1, 2)) # making it so we see the charts side by side, re-adding margins
plot(x, y, col = "blue", pch = 19, cex = 2) + text(x + 0.05, y + 0.05, labels = as.character(1:12))
distxy <- dist(dataFrame)
hClustering <- hclust(distxy)
plot(hClustering)
```

The height on the Cluster Dendrogram is the radius of the circle that would need to be made to enclose all of the clustered points.

Now, let's analyze it a bit. If you were to draw a horizontal line at height = 2, you would see two branches that interesct the line. If you were to draw one at 1, you would have 3 branches. This is how you decide how to cluster your data. Once we have this decided, we can return the cluster assignments from the `hclust()` function.

### Prettier Dendodrams

First, here's the code for the `myplclust()` function that will be used in this section. Click "show".

```{r hc4, class.source = 'fold-hide'}
myplclust <- function(hclust, labels=hclust$labels, lab.col=rep(1,length(hclust$labels)), hang=0.1, xlab="", sub="", ...){
 ## modifiction of plclust for plotting hclust objects *in colour*!
 ## Copyright Eva KF Chan 2009
 ## Arguments:
 ##    hclust:    hclust object
 ##    lab:        a character vector of labels of the leaves of the tree
 ##    lab.col:    colour for the labels; NA=default device foreground colour
 ##    hang:     as in hclust & plclust
 ## Side effect:
 ##    A display of hierarchical cluster with coloured leaf labels.
    y <- rep(hclust$height,2)
    x <- as.numeric(hclust$merge)
    y <- y[which(x<0)]
    x <- x[which(x<0)]
    x <- abs(x)
    y <- y[order(x)]
    x <- x[order(x)]
    plot(hclust, labels=FALSE, hang=hang, xlab=xlab, sub=sub, ... )
    text(x=x, y=y[hclust$order]-(max(hclust$height)*hang), labels=labels[hclust$order], col=lab.col[hclust$order], srt=90, adj=c(1,0.5), xpd=NA, ... )
}
```

With this function, we are adding some color and additional funcitonality to the dendrograms:

```{r hc5}
myplclust(hClustering, labels = rep(1:3, each = 4), lab.col = rep(1:3, each = 4))
```

This one worked because we already knew what colors were needed and that each cluster had four values.

## Merging Points Together 

Lastly, we're going to go over merging the points. There are two main ways of doing this:

* Average Linkage
    * If you take the average of the X and Y coordinates, this will be the location of the new, larger point. Also referred to as the center of gravity for the points
    * Typically shorter linkage
* Complete Linkage 
    * Take the farthest two points from the clusters
    * Typically loneger linkages since all points are included

It's usually good to try both of these approaches to see how the data is represented

## Heatmaps 

The `heatmap()` function is good for visualizing the connections, as it uses the heirarchical clustering to organize the groups of points into an image. Here's an example of it:

```{r heatmap}
df <- data.frame(x = x, y = y)
set.seed(143)
dataMatrix <- as.matrix(dataFrame)[sample(1:12), ]
heatmap(dataMatrix)
```

Honestly, not 100% sure what it's showing, but it will probably make more sense as more is explored.

# Introduction to K-Means Clustering

K-Means clustering is another way of clustering points together. To reiterate how "close" is defined, see the intro section of hierarchical clustering.

K-Means uses a partitioning approach that does the following:

* Fixes the number of clusters
* Gets "centroids" of each cluster
    * These are essentially the centers of gravity we discussed earlier
* Assigns things to closest centroid
* Recalculates centroids

It requires a defined distance metric, a fixed number of clusters, and an initial guess as to cluster centroids. It produces a final estimate of cluster centroids, and it assigns each point to a cluster.

First we're going to start off by rehashing the same plot from earlier:

```{r km1}
set.seed(1234)
par(mar = c(0,0,0,0), mfrow = c(1,1)) # setting global margins to 0
x <- rnorm(12, mean = rep(1:3, each = 4), sd = 0.2) # sets a different mean for each value, provides more variation. That means value 1 is a random value from the distribution of mean 1 and SD 0.2 (2 is 2, 3 is 3, 4 is 1, etc.)
y <- rnorm(12, mean = rep(c(1, 2, 1), each = 4), sd = 0.2)
plot(x, y, col = "blue", pch = 19, cex = 2) # making the plot
text(x + 0.05, y + 0.05, labels = as.character(1:12)) # adds a number to each point
```

This chart has three main clusters made on purpose to highlight how this works. However, it doesn't do what it should (as shown later).

Anyway, next we can use the `kmeans()` function to extract a bunch of information about the data. Here's a chunk that shows the different values it returns, as well as the clusters for the data from earlier:

```{r km2}
dataFrame <- data.frame(x, y)
kmeansObject <- kmeans(dataFrame, centers = 3) # centers is the count of centroids
names(kmeansObject) # shows the different values
kmeansObject$cluster # shows clusters that were assigned

# Making the chart

par(mar = rep(0.2, 4))
plot(x, y, col = kmeansObject$cluster, pch = 19, cex = 2)
points(kmeansObject$centers, col = 1:3, pch = 3, cex = 3, lwd = 3)
```

Now, here's a heatmap section that I again don't fully understand:

```{r km3}
set.seed(1234)
dataMatrix <- as.matrix(dataFrame)[sample(1:12), ]
kmeansObj2 <- kmeans(dataMatrix, centers = 3)
par(mfrow = c(1, 2), mar = c(2, 4, 0.1, 0.1))
image(t(dataMatrix)[, nrow(dataMatrix):1], yaxt = "n")
image(t(dataMatrix)[, order(kmeansObject$cluster)], yaxt = "n")
```

I think that the first chart just shows the heatmap of the data, wheras the second one shows it by cluster. However it doesn't make sense visually to me.

# Dimension Reduction

This seciton also goes over Principal components Analysis and Singular Value Decomposition.

First, we're going to start out with some sample Matrix data:

```{r DR1}
set.seed(12345)
par(mar = rep(0.2, 4))
dataMatrix <- matrix(rnorm(400), nrow = 40)
image(1:10, 1:40, t(dataMatrix)[, nrow(dataMatrix):1])
```

As you can see, the matrix image looks pretty noisy, and there's not much to gather from it. Let's make a heatmap:

```{r DR2}
par(mar = rep(0.2, 4))
heatmap(dataMatrix)
```

Still, not mich going on. Let's add a pattern to the dataset:

```{r DR3}
set.seed(678910)
for (i in 1:40){
    # flip a coin
    coinFlip <- rbinom(1, size = 1, prob = 0.5)
    # if coin is heads, add a common pattern to that row
    if(coinFlip){
        dataMatrix[i, ] <- dataMatrix[i, ] + rep(c(0, 3), each = 5)
    }
}
# now, there will be more to gather:
head(dataMatrix)
par(mar = rep(0.2, 4))
heatmap(dataMatrix)
```

Now, we can start to see some shofts in the data. Now, let's look at three different plots:

* The first one will be the original matrix data, reordered to the heirarchical cluster analysis, looking at row means
* The second one will be a plot of the mean for each of the rows (y axis is row #, x is row mean)
    * There is a clear shift as you go across the rows
* The last plot is the column means, with the column # as the x axis

```{r DR4}
hh <- hclust(dist(dataMatrix))
dataMatrixOrdered <- dataMatrix[hh$order,]
par(mfrow = c(1, 3))
image(t(dataMatrixOrdered)[, nrow(dataMatrixOrdered):1])
plot(rowMeans(dataMatrixOrdered), 40:1, , xlab = "Row Mean", ylab = "Row", pch = 19)
plot(colMeans(dataMatrixOrdered), xlab = "Column", ylab = "Column Mean", pch = 19)
```

Cluster analysis is useful for finding these types of patterns, and there are two main types of problems that we can use this for.

## SVD and PCA 

First, here are what the acronyms mean:

* SVD is the Method of Singular Value Decomposition
* PCA is  the Method of Principal Components Analysis

These methods can be used to find patterns in large matrix datasets.

### Method of Singular Value Decomposition

This is for when you have a lot of variables and want to make a new set that are uncorrelated and explain the variance as much as possible. As long as they aren't all independent measurements, we can do this. We can then use this to show the variation in the data, and reduce the number of variables 

This is a statistical goal and its solved by the method of principle components analysis. Written in mathematical terms it sounds like:

* If `X` is a matrix with each variable in a column and each observation in a row, then the SVD is a matrix decomposition that looks like `X = UDV^T`, where the columns of `U` are orthogonal (left singular vectors), the columns of `V`are orthogonal (right singular vectors), and `D` is a diagonal matrix (single values)

### Method of Principal Components Analysis

This is for when you want to find the lower rank matrix that explains the originial data reasonably well. This is more of a data compression problem, as you want to reduce the size, and uses the singular value decomposition method from 

In mathematical terms, it sounds like this:

* The principal components are equal to the right singualr values from the if you first scale (subtract the mean, divide by the standard deviation) the variables from the SVD

This pretty much means that if you were to take the original data matrix, subtract the mean of each column from the values and divide by the standard deviation, and then run an SVD on the new values, then the principle components would be equal to the right singular values.

### Components of the SVD 

First, we're going to chart the `U` and the `V` (first left singular vector and first right singular vector):

```{r DR5}
svd1 <- svd(scale(dataMatrixOrdered))
par(mfrow = c(1, 3))
image(t(dataMatrixOrdered)[, nrow(dataMatrixOrdered):1])
plot(svd1$u[, 1], 40:1, , xlab = "Row", ylab = "First Left Singular Vector", pch = 19)
plot(svd1$v[, 1], xlab = "Column", ylab = "First Right Singular Vector", pch = 19)
```

The FLSV chart roughly shows the mean of the data set (negative for rows 40 - 17, positive for the 1 - 17), and the FRSV shows the change in mean between the columns. Keep in mind that we purposefully made the data have two distinct sections in the rows since they were ordered (if it was unordered, it would be very unclear).

Now, let's take a look at the `D` value:

```{r DR6}
par(mfrow = c(1, 2))
plot(svd1$d, xlab = "Column", ylab = "Singular Value", pch = 19)
plot(svd1$d^2/sum(svd1$d^2), xlab = "Column", ylab = "Proportion of Variance Explained", pch = 19)
```

The plot on the left is the `D` matrix, which is a diagonal matrix, so it only has values that are on the diagonal of that matrix. The one on the left explains these values, showing their proportion of variance. Essentially, this means that each singular value represents the percent of total variaiton in the dataset

In this dataset, nearly half of the variation occurs in column 1.

Now, let's show the relationship to the principal components:

```{r DR7}
pca1 <- prcomp(dataMatrixOrdered, scale = TRUE)
plot(pca1$rotation[, 1], svd1$v[, 1], pch = 19, xlab = "Principal Component 1", ylab = "Right Singular Vector 1")
abline(c(0,1))
```

This shows that they're doing very similar things!

### A Binary Example 

For this example, we're going to explore the variance a bit more, and use a binary matrix (only 0 or 1):

```{r DR8}
constantMatrix <- dataMatrixOrdered*0
for(i in 1:dim(dataMatrixOrdered)[1]){constantMatrix[i,] <- rep(c(0,1), each = 5)}
svd1 <- svd(constantMatrix)
par(mfrow = c(1, 3))
image(t(constantMatrix)[,nrow(constantMatrix):1])
plot(svd1$d, xlab = "Column", ylab = "Singular Value", pch = 19)
plot(svd1$d^2/sum(svd1$d^2), xlab = "Column", ylab = "Proportion of Variance Explained", pch = 19)
```

The matrix itself has the first five columns as 0, and the second five as 1. Based on the chart in the middle, you can see that there is one singular value that explains 100% of the variation in the dataset.

Even though there are 40 rows and 10 columns, there's really only one level of variation, which is the fact that it can be 0 or 1. This is captured by the SVD. Now, let's add a second pattern to the dataset.

```{r DR9}
set.seed(678910)
for (i in 1:40){
    # flip a coin
    coinFlip1 <- rbinom(1, size = 1, prob = 0.5)
    coinFlip2 <- rbinom(1, size = 1, prob = 0.5)
    # if coin is heads, add a common pattern to that row
    if(coinFlip1){
        dataMatrix[i, ] <- dataMatrix[i, ] + rep(c(0, 5), each = 5)
    }
    if(coinFlip2){
        dataMatrix[i, ] <- dataMatrix[i, ] + rep(c(0, 5), 5)
    }
}
hh <- hclust(dist(dataMatrix))
dataMatrixOrdered <- dataMatrix[hh$order,]
```

The pattern itself will have the following "dimensions" to it:

* The first coin flip makes it so one half of the data is going to have one mean and vice versa
* The second coin flip alternates between the columns

Now, let's chart "the truth" which is what the patterns should be in a perfect world (notice that the plots don't use the data):

```{r DR10}
svd2 <- svd(scale(dataMatrixOrdered))
par(mfrow = c(1, 3))
image(t(dataMatrixOrdered)[, nrow(dataMatrixOrdered):1])
plot(rep(c(0,1), each = 5), pch = 19, xlab = "Column", ylab = "Pattern 1")
plot(rep(c(0,1), 5), pch = 19, xlab = "Column", ylab = "Pattern 2")
```

What we want to do is find an algorithm that uses the matrix on the left (the heatmap) and "pick up" the patterns in the two plots. Now let's see what is actually returned in an SVD:

```{r DR11}
svd2 <- svd(scale(dataMatrixOrdered))
par(mfrow = c(1, 3))
image(t(dataMatrixOrdered)[, nrow(dataMatrixOrdered):1])
plot(svd2$v[, 1], pch = 19, xlab = "Column", ylab = "First Right Singular Vector")
plot(svd2$v[, 2], pch = 19, xlab = "Column", ylab = "Second Right Singular Vector")
```

As you can see, the first singular vector roughly picks up the patterns (it's just not as pretty!), but the second one doesn't very well. What we're actually seeing is a mix of the two patterns, which makes it hard to discern what is happening. We only can because we know what the "truth" should be.

Now let's take a look at the patterns of variance to see if this helps:

```{r DR12}
svd1 <- svd(scale(dataMatrixOrdered))
par(mfrow = c(1, 2))
plot(svd1$d, xlab = "Column", ylab = "Singular Value", pch = 19)
plot(svd1$d^2/sum(svd1$d^2), xlab = "Column", ylab = "Percent of Variance Explained", pch = 19)
```

The first component explains over 50% of the variation. This is likely due to the first pattern being a shift pattern, which affected the data a lot. The second component only captures around 18%. This tells you that the alternating pattern is a bit harder to pickup in the data, and most of the others aren't important.

### Missing Values 

Unfortunately, as shown below, the `svd()` function doesn't work if there are missing values in the dataset. Here's an example where we insert some NA values into the previous dataset:

```{r DR13}
dataMatrix2 <- dataMatrixOrdered
dataMatrix2[sample(1:100, size = 40, replace = FALSE)] <- NA
# svd1 <- svd(scale(dataMatrix2))
```

One of the methods we can use to "replace" these values is to impute them. If you use the `impute.knn()` function from the `impute` library, then you can substitute the missing values for an average of a certain number of the closest rows (represented by `k`). The plots below will show the first singular vector from the original matrix, and the one from the matrix where the data was imputed.

How to install `impute` package:

```{r impute, eval = FALSE}
if (!require("BiocManager", quietly = TRUE))
    install.packages("BiocManager")

BiocManager::install("impute")
```

Example:

```{r DR14}
library(impute)
dataMatrix2 <- impute.knn(dataMatrix2)$data
svd1 <- svd(scale(dataMatrixOrdered)); svd2 <- svd(scale(dataMatrix2))
par(mfrow = c(1, 2)); plot(svd1$v[,1], pch = 19); plot(svd2$v[,1], pch = 19)
```

As you can see, the data doesn't change too much when it's imputed.

### Face Example

Lastly, we're going to take a look at an image of a face. However, you will need to copy this code and run it in your IDE as idk how to make it so it works with RMD:

```{r DR15, eval = FALSE}
par(mfrow = c(1,1))
load("R Guide/General Notes/Files/face.rda")
image(t(faceData)[, nrow(faceData):1])
```

As you can see, there is a nose, mouth, eyes, and ears in this image that you can pick out. Let's look at the SVD:

```{r DR16, eval = FALSE}
svd1 <- svd(scale(faceData))
plot(svd1$d^2/sum(svd1$d^2), pch = 19, xlab = "Singular Vector", ylab = "Variance Explained")
```

The variance explained shows that the first vector has around 40% of the variance, second has 20%, and so on. Most of the variance is present in the first 5 to 10 points.

We can actually take a look at the images made by the first point, the first five, the first ten, etc. The following seciton does this, and uses some matrix multiplication:

```{r DR17, eval = FALSE}
svd1 <- svd(scale(faceData))

## Note that %*% is matrix multiplication

# svd1$d[1] is a constant
approx1 <- svd1$u[, 1] %*% t(svd1$v[, 1]) * svd1$d[1]

# In these, we need to make the diagonal matrix out of d
approx5 <- svd1$u[, 1:5] %*% diag(svd1$d[1:5]) %*% t(svd1$v[, 1:5])
approx10 <- svd1$u[, 1:10] %*% diag(svd1$d[1:10]) %*% t(svd1$v[, 1:10])

# Here are the four plots
par(mfrow = c(2, 2))
image(t(approx1)[, nrow(approx1):1], main = "(a)")
image(t(approx5)[, nrow(approx5):1], main = "(b)")
image(t(approx10)[, nrow(approx10):1], main = "(c)")
image(t(faceData)[, nrow(faceData):1], main = "(d)")
```

The above plots show that as you intorduce more primary values, the full picture will start to come out. This is a good way of showing data compression!

### Additional Notes 

Here are some small notes about these tools:

* Scale matters a lot 
* PC's/SV's may mix real patterns, as shown in the binary example
* Can be computationally intensive if you have a large matrix 
* Some alternatives include Factor Analysis, Independent Components Analysis, and Latent Semantic Analysis (similar tools and ideas, but different aspects)

# Clustering Case Studies

Here are two case studies that use these techniques, from the JH course.

## Study 1 - Smartphone Predictions

This first case study is going to use smartphone data to predict user activity. It'll mainly be an exploratory analysis that focuses on quesitons you may ask and what you need to figure out.

Since they processed the data outside of the course, I will just provide a general code section that describes what is going on:

```{r caseStudy, eval = FALSE}
load("data/samsungData.rda") # this is the processed data from the zip in the files folder 
names(samsungData)[1:12] # This shows the first 12 columns (X, Y, and Z body acceleration points)
table(samsungData$activity) # This shows the count of activities that were done (laying, sitting, walking, etc.)
par(mfrow = c(1, 2), mar = c(5, 4, 1, 1))
samsungData <- transform(samsungData, activity = factor(activity)) # This changed the activity column to be a factor
sub1 <- subset(samsungData, subject == 1) # Isolates the first subject / person
plot(sub1[, 1], col = sub1$activity, ylab = names(sub1)[1]) # Plots the tBodyAcc-mean()-X
plot(sub1[, 2], col = sub1$activity, ylab = names(sub1)[2]) # Plots the tBodyAcc-mean()-Y
legend("bottomright", legend = unique(sub1$activity), col = unique(sub1$activity)) # Adds a general legend to the second plot

# The above section was to get acquainted with the data. Now, we will cluster the data based on average acceleration

source("myplclust.R") # This was for the `myplclust()` function that was shown earlier. It just makes it prettier
distanceMatrix <- dist(sub1[, 1:3])
hclustering <- hclust(distanceMatrix)
myplclust(hclustering, lab.col = unclass(sub1$activity)) # This makes a pretty cluster dendrogram, but it's pretty messy and you can't gather much from it

# Now, we will look at the maximum acceleration instead

par(mfrow = c(1, 2))
plot(sub1[, 10], pch = 19, col = sub1$activity, ylab = names(sub1)[10])
plot(sub1[, 11], pch = 19, col = sub1$activity, ylab = names(sub1)[11])

# If you cluster it based on the max, it will have a much more clear pattern, as shown below

source("myplclust.R") # This was for the `myplclust()` function that was shown earlier. It just makes it prettier
distanceMatrix <- dist(sub1[, 10:12])
hclustering <- hclust(distanceMatrix)
myplclust(hclustering, lab.col = unclass(sub1$activity))

# It looks like this separates out the moving from the nonmoving, but the individual activities are still mixed a bit

# Let's do an SVD on the data

svd1 <- svd(scale(sub1[, -c(562, 563)])) # this removes the last two columns from the SVD since these include the subject and activity identifiers
par(mfrow = c(1, 2))
plot(svd1$u[, 1], col = sub1$activity, pch = 19)
plot(svd1$u[, 2], col = sub1$activity, pch = 19)

# It looks like the first plot separates the moving activites from the non-moving activities, while the second one gets the magenta color to be separated

# Now, we're going to find the Maximum Contributor

plot(svd1$v[, 2], pch = 19) # this shows a non-colored plot of the variation as a whole

maxContrib <- which.max(svd1$v[, 2])
distanceMatrix <- dist(sub1[, c(10:12, maxContrib)])
hclustering <- hclust(distanceMatrix)
myplclust(hclustering, lab.col = unclass(sub1$activity))

# This produces a plot for the maximum acceleration, plus the maxContrib feature
# Now, the activities appear more separated, with the moving activities all being completely free. The non-moving activities are still a bit jumbled
# The Max Contributor was the mean body acceleration in the frequency domain for the Z direction, as shown by the next line

names(samsungData)[maxContrib]

# Now, we're going to try k-means clustering

kClust <- kmeans(sub1[, -c(562, 563)], centers = 6) # We specified 6 clusters since there are 6 activities
table(kClust$cluste, sub1$activity)

# The table should show which activities make up each cluster. 1 is mostly walk, 2 is mostly walkdown, 3 is laying, sitting, standing, 4 is mostly walkup, 5 is mostly walk, 6 is a bit of laying and sitting

# Now, let's try some different nstart= values

kClust <- kmeans(sub1[, -c(562, 563)], centers = 6, nstart = 1) 
table(kClust$cluste, sub1$activity)

# slightly different

kClust <- kmeans(sub1[, -c(562, 563)], centers = 6, nstart = 100) 
table(kClust$cluste, sub1$activity)

# a bit better, but not perfect

# Keep in mind that if you keep trying it, the values will be slightly different since KMeans chooses a random start point by default. Because of this, you can run it over and over again until you find a fairly good split

# Now, let's plot the clusters (this is based off of the 6 centers used in the video)

plot(kClust$center[1, 1:10], pch = 19, ylab = "Cluster Center", xlab = "")

# In the example, the first cluster corresponded with laying. The first three points on the chart indicate that most of the variation comes from the columns corresponding to mean body acceleration 

plot(kClust$center[4, 1:10], pch = 19, ylab = "Cluster Center", xlab = "")

# In the example, cluster 4 corresponded to walking. The points are much more interesting in this plot.

# There isn't really an end to this case study, it was mainly for exploring the things we could do. Maybe work on it later?

# The main point of this is to direct you on where to direct your energy while working with finding trends in the data
```

## Study 2 - Air Pollution Data

This one is going to go a bit more in depth, and explore the overall process of exploratory analysis.

### Asking the Question

This study is going to be exploring air particulate patterns, or how dust in the air affects us. We're going to look at data from 1999 and 2012, and see if the averages are lower in 2012 than 1999.

The ZIP files can be found here: https://aqs.epa.gov/aqsweb/airdata/download_files.html

We will be following the PM2.5 Local Conditions, which has the parameter code 88101. This was found here: https://aqs.epa.gov/aqsweb/documents/codetables/methods_all.html

### Opening and Exploring the Files

Let's take a look at the two csvs that are in the Files folder. The data used in the videos is different / there was more cleaning needed.

```{r CS2}
pm0 <- read.csv("R Guide/General Notes/Files/daily_88101_1999.csv")
str(pm0)
pm1 <- read.csv("R Guide/General Notes/Files/daily_88101_2012.csv")
str(pm1)

# First, let's pull out the PM2.5 data using the artithmetic mean

x0 <- pm0$Arithmetic.Mean 
str(x0)
summary(x0)

# Since there is only one NA value, we will keep it in just in case. Typically, you would want to think about what would happen if you ignore them. If there were a lot more values, we would have to weigh the pros and cons

x1 <- pm1$Arithmetic.Mean 
str(x1)
summary(x1)

# So far, it looks like the overall levels have gone down

boxplot(x0, x1)

# It is very clear that the Max values skew this data pretty heavily. The medians are close to 0, whereas the means are in the 40s

# Another issue is the negative values. There shouldn't be any since it's mass

negative <- x1 < 0
sum(negative, na.rm = TRUE)
mean(negative, na.rm = TRUE)

# There are only 1130, which is .41% of the data. We could possibly look into this in the future if we want, but we can mainly ignore it

dates0 <- as.Date(pm0$Date.Local)
dates1 <- as.Date(pm1$Date.Local)

par(mfrow = c(1, 2))
hist(dates0, "month")
hist(dates1, "month")

# Let's take a look at when the NA values occur

par(mfrow = c(1, 2))
hist(dates1, "month")
hist(dates1[negative], "month")

# Not too much correlation, maybe take a deep dive with someone that understands why
```

Now that we have the data loaded and have explored it a bit, let's take a look at one monitor.

### Looking at the Data for One Monitor 

For this, we're going to find a monitor in Washington that appears in both datasets.

```{r CS2.1}
# First, let's find WA state code
logicalVector <- pm0$State.Name == "Washington"
head(pm0[logicalVector,1])

site0 <- unique(subset(pm0, State.Code == 53, c(County.Code, Site.Num)))
site1 <- unique(subset(pm1, State.Code == 53, c(County.Code, Site.Num)))
head(site0)

# Let's make them into vectors
site0 <- paste(site0[, 1], site0[,2], sep = ".")
site1 <- paste(site1[, 1], site1[,2], sep = ".")
str(site0)
str(site1)
# As you can see, it's the county followed by the site number. There are actually fewer sites in 2012!

both <- intersect(site0, site1)
both

# It would also be useful to take a look at the one with the most data, let's find that out.

pm0$county.site <- with(pm0, paste(County.Code, Site.Num, sep = "."))
pm1$county.site <- with(pm1, paste(County.Code, Site.Num, sep = "."))
cnt0 <- subset(pm0, State.Code == 53 & county.site %in% both)
cnt1 <- subset(pm1, State.Code == 53 & county.site %in% both)

# The next line of code makes many tables, and shows the rows in each
sapply(split(cnt0, cnt0$county.site), nrow)
sapply(split(cnt1, cnt1$county.site), nrow)

# We're going to use county.code 33.57 since it has the most data in each

pm0sub <- subset(pm0, State.Code == 53 & County.Code == 33 & Site.Num == 57)
pm1sub <- subset(pm1, State.Code == 53 & County.Code == 33 & Site.Num == 57)
dim(pm0sub)
dim(pm1sub)

# Let's plot them out

dates0 <- as.Date(pm0sub$Date.Local)
dates1 <- as.Date(pm1sub$Date.Local)
x0sub <- pm0sub$Arithmetic.Mean
x1sub <- pm1sub$Arithmetic.Mean
plot(dates0, x0sub)
abline(h = median(x0sub, na.rm = TRUE))
plot(dates1, x1sub)
abline(h = median(x1sub, na.rm = TRUE))

# While it looks like its going up, look at the y-axis! Let's fix it: 

rng <- range(x0sub, x1sub, na.rm = TRUE)

plot(dates0, x0sub, ylim = rng)
abline(h = median(x0sub, na.rm = TRUE))
plot(dates1, x1sub, ylim = rng)
abline(h = median(x1sub, na.rm = TRUE))

# Now it makes more sense! Data gets more compressed in 2012, and the median slightly dropped
# This is even more surprising since we're looking at Seattle-Bellevue, which had a massive population increase
```

### Looking at States

While it's useful to look at one site, it's even more useful to see at the State level, as this is where the policy is enacted.

In this section, we're going to see which states are going up and which are going down

```{r CS2.2}
mn0 <- with(pm0, tapply(Arithmetic.Mean, State.Code, mean, na.rm = TRUE))
str(mn0)
summary(mn0)
mn1 <- with(pm1, tapply(Arithmetic.Mean, State.Code, mean, na.rm = TRUE))
str(mn1)
summary(mn1)

# Now, let's make a DF that shows states and their measures

d0 <- data.frame(state = names(mn0), mean = mn0)
d1 <- data.frame(state = names(mn1), mean = mn1)
head(d0)
head(d1)
mrg <- merge(d0, d1, by = "state")
dim(mrg)
head(mrg)
par(mfrow = c(1, 1))
with(mrg, plot(rep(1999, 51), mrg[, 2], xlim = c(1998, 2013))) 
# This adds the value 1999 to all of the rows, and sets the xlim of the chart to 1998 and 2013 (this is so the points are in the area, not against the edge)
with(mrg, points(rep(2012, 51), mrg[, 3])) 
# Notice that we used points() instead of plot(). This adds them to the same plot.
segments(rep(1999, 51), mrg[, 2], rep(2012, 51), mrg[, 3])
```

Turns out that this case study doesn't actually use any of the other topics in this document.