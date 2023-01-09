---
title: "Variability, Dsitributions, and Asymptotics"
description: "Doks is a Hugo theme for building secure, fast, and SEO-ready documentation websites, which you can easily update and customize."
lead: "Doks is a Hugo theme for building secure, fast, and SEO-ready documentation websites, which you can easily update and customize."
date: 2023-1-09T08:48:57+00:00
lastmod: 2023-1-09T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "statistics"
weight: 050
toc: true
---

This document will go over variability, distributions, and asymptotics. It continues from the end of the probability document. Maybe combine them / find another method later? Maybe individual documents for each small one, in addition to one larger document that covers the course?

# Variance

The variance of a random variable is a measure of spread. Here is the function:

* **Var(X)=E[(X-u)^2^] = E[X^2^] - E[X]^2^**, u = mean (mu)
* The first equation above is the expected square distance from the mean
* The second equation above is a shortcut, which is the expected value of X squared, subtracted by the expected value of X, squared (notice the comma)

Going back to the 6-sided dice, take the following into consideration:

* **E[X]** = 3.5 (1*(1/6) + 2*(1/6), etc.) = **3.5**
* **E[X^2^]** = (1^2^ * (1/6)) + (2^2^ * (1/6) + (3^2^... etc. = **15.17**
* **E[X]^2^** = 3.5*3.5 = **12.25**
* **Var(X) = E[X^2^]-E[X]^2^ = 2.92**

For a coin, we can remember that the **E[X]** is equal to p. **E[X^2^]** is also equal to p, as 0 squared is 0, and 1 squared is 1, so the formula is the same. With this, we can find the following equation for the variance of a coin flip:

* **Var(X) = p - p^2^ = p(1-p)**

Remember this!

## Standard Error of the Mean

Recall the mean; the average of random samples from a population is itself a random variable. Here's a way of thinking about it:

* **E[X^-^] = u** (sample mean is equal to pop mean. Pretend the X has a bar over it)
* **Var(X^-^) = σ^2^/n** (variance of sample mean is equal to variance of original population (σ^2^) divided by n count of samples)(Alt+229 for sigma)

Keep in mind that the sample variance (S^2^) estimates the populaiton variance (σ^2^), where S is equal to the standard deviation.

To summarize, S, standard deviation, talks about how variable a population is. S/√n is the standard error, which talks about how variable averages of random samples of size n from the population are.

Let's take a look at a real data example:

```{r varEx}
library(UsingR); data(father.son);
x <- father.son$sheight
n <- length(x)

g <- ggplot(data = father.son, aes(x = sheight))
g <- g + geom_histogram(aes(y = ..density..), fill = "lightblue", binwidth=1, colour = "black")
g <- g + geom_density(size = 2, colour = "black")
g

# we calculate the parameters for variance of distribution and sample mean,
round(c(sampleVar = var(x),
    sampleMeanVar = var(x) / n,
    # as well as standard deviation of distribution and sample mean
    sampleSd = sd(x),
    sampleMeanSd = sd(x) / sqrt(n)),2)
```

As we can see, the chart above plot's the density of the son's height.

Of the numbers returned, the third is the best variance (the standard deviation) since its in units, instead of units squared.

The second and fourth numbers are the errors, with the fourth being the standard error of the averages.

# Distributions 

This section will cover the most important three distributions; Binomial, Normal, and Poisson

## Binomial Distributions (Bernoulli)

Binomial dsitributions, also known as Bernoulli, arise as a result of a binary outcome. Here are some rules for them:

* Success is 1, failure is 0
* The mean of a Bernoulli random variable is p 
* The variance is p(1-p)
* If X=x (The outcome (X) is represented by x), then:
    * **P(X=x) = p^x^(1-p)^1-x^**
* Let X~1~, ..., X~n~ be iid Bernoulli(p)
    * Then, X, from i-n, is a binomial random variable 
        * The from i-n thing can be represented using the big E, with n on top, and i=1 on bottom
* Bernoulli mass function:
    * **P(X=x) = (n x)p^x^(1-p)^n-x^**
        * The (n x) represents the n being on top of the x in a parenthesis ("n choose x"), which means this:
            * (n x) = n!/x!(n-x)!, lots of factorials!
            * For this, (n 0) and (n n) must equal 1
            * The term itself counts the number of ways of selecting x items out of n without replacement, disregarding the order of the items

Here's a quick example:

Suppose a friend has 8 children, 7 of which are girls.

If each gender has an independent 50% probability for each birth, what's the probability of getting 7 or more girls out of 8 births?

Here is the function:

* **(8 7).5^7^(1-.5)^1^ + (8 8).5^8^(1-.5)^0^ = 0.03516**

Here is the r code:

`choose(8, 7)*.5^8 + choose(8, 8)*.5^8`

Or:

`pbinom(6, size = 8, prob = .5, lower.tail = FALSE)` (6 since it's measuring 7+)

## Normal Distributions (Gaussian)

pi is Alt+0960

A normal (gaussian) distribution has the following characteristics:

* Mean u and variance σ^2^
* Density function of:
    * **(2πσ^2^)^-1/2^e^-(x-σ)2/2σ2^** (the later 2s are squared)
* If the expected value of X is u (E[X]=u), and the variance is sigma-squared, then:
    * X~N(u, σ^2^)
* When u=0 and σ=1, it is a standard normal distribution, whose variables are often notated as z
* Approximately 68%, 95%, and 99% of the normal density lies within 1, 2, and 3 standard deviations from the mean, respectively
    * -1.28, -1.645, -1.96, and -2.33 are the 10th, 5th, 2.5th, and 1st percentiles (positive values are 90th, etc.)

Now, let's take a look at some questions:

* What is the 95th percentile of a N(u,σ^2^) distribution?

In R, you could use the following code:

`qnorm(.95, mean = u, sd = σ)`

Or, you can use the 1.645 from earlier, so that the 95th percentile is: `u+1.645σ`

* What is the probability that a N(u,σ^2^) is larger than x?

In r, you could just use:

`pnorm(x, mean = u, sd = σ, lower.tail = FALSE)` (notice it is σ, not squared)

Or:

(X-u)/σ, 

This means that X is _# of SDs from the mean, which has a percentile associated with it (2 SDs is 95th percentile)

* Assume that the number of daily clicks for a company is (approximately) normally distributed with a mean of 1020 and a standard deviation of 50. What's the probability of getting more than 1,160 clicks?

(1160-1020)/50 = 2.8 standard deviiations from the mean.

Once we have the standard deviations, we can find the percentile in R:

`pnorm(2.8, lower.tail = FALSE)`

We can also do this all in R:

`pnorm(1160, mean = 1020, sd = 50, lower.tail = FALSE)`

Notice that we just subbed out the standard deviations in the first one, and instead included the value, the mean, and the SD.

Let's do another form this data:

* What number of clicks would represent the one where 75% of days have fewer clicks (assuming days are independent and identically distributed)?

`qnorm(.75, mean = 1020, sd = .5)` (1054)

## Poisson Distribution 

This one is used to primarily model counts. Here are some other uses:

* Modeling count data 
* Modeling event-time or survival data 
* Modeling contigency tables 
* Approximating binomials when n is large and p is small
* Model rates

Here are some aspects and constraints of these distributions:

* Here is the Poisson mass function:
    * P(X=x:λ) = λ^x^e^-λ^ / x!
* The mean of the distribution is λ. But, so is the variance!
    * The mean and the variance must be equal for it to be a Poisson distribution
* How to model rates:
    * X~Poisson(λt) where
        * λ=E[X/t] is the expected count per unit of time (lambda)
        * t is the total modeling time
* When n is large and p is small, the Poisson distribution can be an accurate approximation to the binomial distribution:
    * X~Binomial(n,p) ("Let X be a binomial funciton of n and p")
    * λ=np (define lambda as n times p (count times probability, which is rate per one "instance" as the measure of time))

Here's an example of modeling rates:

* The number of people that show up at a bus stop is Poisson, with a mean of 2.5 per hour. If you're watching the stop for four hours, what is the probability that 3 or fewer people show up for the whole time?

For this, we can use the `ppois()` function, and set `lambda=` to 2.5 * 4 (2.5 is Lambda (expected count per unit of time), and we're going for four hours)

`ppois(3, lambda = 2.5*4)`, which is 0.01034.

Here's an example of the binomial approximation:

* We flip a coin with success probability 0.01 five hundred times. What's the probability of 2 or fewer successed?

Binom:

`pbinom(2, size = 500, prob = 0.01)`

Pois:

`ppois(2, lambda = 500*0.01)`

Fairly close values!

# Asymptotics 

From the course:

Asymptotics are an important topics in statistics.  Asymptotics refers to the behavior of estimators as the sample size goes to infinity. Our very notion of probability depends on the idea of asymptotics. For example, many people define probability as the proportion of times an event would occur in infinite repetitions. That is, the probability of a head on a coin is 50% because we believe that if we were to flip it infinitely many times, we would get exactly 50% heads. 

Asymptotics is the term for the behavior of statistics as the sample size limits to infinity.

Regarding iid observations, The Law of Large Numbers says that the average limits to what its estimating, which is the population mean.

I.e. as you sample a population over and over, it eventually converges to the true probability of a head.

An estimator is consistent if it converges to what you want to estimate

## The Central Limit Theorem 

For the purposes of this course, the CLT states that the distribution of averages of iid variables becomes that of a standard normal as the sample size increases.

The results of the function `(Estimate - Mean of Estimate)/Standard Error of Estimate` has a distribution like that of a standard normal for large n.

A useful way of thinking about it is that X~n~ (X has a bar over it) is approximately N(u, σ^2^/n).

Let's take a look at an example:

We're going to simulate a standard random variable by rolling n (6-sided). Let X~i~ be th eoutcome for die i. The mean (E[X~i~]) = 3.5. Var[X~i~] = 2.92. SE = 1.71/√n.

Based on the CLT function from earlier, we will take the mean of n dice rolls, subtract off 3.5, and divide by the SE.

Here's some code that takes a look at that:

```{r clt1}
flips <- data.frame(matrix(ncol = 3, nrow = 0))
colnames(flips) <- c("ten", "twenty", "thirty")
str(flips)

coinFlip = function(n) sample(1:6, n, rep=T)

for(i in 1:2000){

        ten <- coinFlip(10)
        twenty <- coinFlip(20)
        thirty <- coinFlip(30)

        flips <- rbind(flips, data.frame((mean(ten)-3.5)/(1.71/sqrt(10)), 
                                        (mean(twenty)-3.5)/(1.71/sqrt(20)), 
                                        (mean(thirty)-3.5)/(1.71/sqrt(30))))
}

flips <- melt(flips, value.name = "CLTvalues")
str(flips)
ggplot(flips, aes(x = CLTvalues, fill = variable)) + 
        geom_histogram() +
        facet_grid(cols = vars(flips$variable))
```

As we add to the size of the sample (number of dice rolls), we can see that it converges toward a bell curve.

### Binomial CLT 

For a possibly unfair coin, let X~i~ be the 0 or 1 result of the i^th^ flip. The sample proportion (p-hat), is the average of the coin flips.

E[X~i~] = p (.5), and Var(X~i~) = p(1-p) (.25). SE of the Mean is √(p(1-p)/n) (.5/n). 

CLT would be (p-hat - p)/√(p(1-p)/5), so we will use that in the following simulation:

```{r clt2}
flips <- data.frame(matrix(ncol = 3, nrow = 0))
colnames(flips) <- c("ten", "twenty", "thirty")
str(flips)

coinFlip = function(n) sample(0:1, n, rep=T)

for(i in 1:2000){

        ten <- coinFlip(10)
        twenty <- coinFlip(20)
        thirty <- coinFlip(30)

        flips <- rbind(flips, data.frame((mean(ten)-.5)/(.5/sqrt(10)), 
                                        (mean(twenty)-.5)/(.5/sqrt(20)), 
                                        (mean(thirty)-.5)/(.5/sqrt(30))))
}

flips <- melt(flips, value.name = "CLTvalues")
str(flips)
ggplot(flips, aes(x = CLTvalues, fill = variable)) + 
        geom_histogram() +
        facet_grid(cols = vars(flips$variable))
```

A normal distribution curve slightly works as we increase n. Let's take a look at an unfair coin with p=.9:

```{r clt2}
flips <- data.frame(matrix(ncol = 3, nrow = 0))
colnames(flips) <- c("ten", "twenty", "thirty")
str(flips)

coinFlip = function(n) sample(0:1, n, rep=T, prob = c(.1, .9))

for(i in 1:2000){

        ten <- coinFlip(10)
        twenty <- coinFlip(20)
        thirty <- coinFlip(30)

        flips <- rbind(flips, data.frame((mean(ten)-.9)/(.3/sqrt(10)), 
                                        (mean(twenty)-.9)/(.3/sqrt(20)), 
                                        (mean(thirty)-.9)/(.3/sqrt(30))))
}

flips <- melt(flips, value.name = "CLTvalues")
str(flips)
ggplot(flips, aes(x = CLTvalues, fill = variable)) + 
        geom_histogram() +
        facet_grid(cols = vars(flips$variable))
```

As we can see, it is not the best way of approximating it (http://sux13.github.io/DataScienceSpCourseNotes/6_STATINFERENCE/Statistical_Inference_Course_Notes.html#sample-variance), but it does get better as we increase n. This simply means that it won't always be a good approximation, but will always get better as it approaches infinity.

## Confidence Intervals

When looking at a normal distribution, the probability that the sample mean is bigger than **u+2σ/√n**, or smaller than the inverse, is 5%. Because of this, the 95% confidence interval for u is **u±2σ/√n**.

Keep in mind that the 2 is from rounding up the 1.96 value.

Here's an example of how to do this in r:

```{r confidence}
library(UsingR)
data(father.son)
x <- father.son$sheight
(mean(x) + c(-1, 1) * qnorm(0.975) * sd(x)/sqrt(length(x)))/12
```

For this data, the confidence interval is 5.71 to 5.74.

If you want to look at a binary situation, where **σ = p(1-p)**, the interval takes the form:

**p̂±z~(1-∝/2√(p(1-p)/n))**

By substituting p̂ for p, you can obtain the Wald confidence interval with the above function.

A quick 95% interval formula for p would be: **p̂±(1/√n)**.

Here's an example of this in use:

### Campaign example

Your campaign advisor told you that in a random sample of 100 likely voters, 56 intend to vote for you. 

Can you relax? Do you have it won?

A quick calculation shows that 1/sqrt(100) = .1, so 56% ± 10% is (.46, .66).

Because of this, we should not be confident since .46 is below .50.

Here are two ways to find the exact confidence levels using r:

```{r conf2}
.56 + c(-1, 1) * qnorm(.975) * sqrt(.56* .44/100)
binom.test(56, 100)$conf.int
```

### Simulation example

Let's consider a simulation, where a coin with a given success probability is flipped a lot, and calculate the percentage of times the walled intervals cover the true coin probability use to generate the data.

```{r conf3}
n <- 20 # 20 coin flips
pvals <- seq(0.1, 0.9, by = 0.05) # True values of the success probability 
nosim <- 1000 # 1000 sims
# Now, we're going to loop over the true success probabilities.
# The function will generate 1000 sets of 20 coin flips, the upper and lower limits, and the proportion of times they cover the intervals
coverage <- sapply(pvals, function(p){
    phats <- rbinom(nosim, prob = p, size = n)/n
    ll <- phats - qnorm(.975) * sqrt(phats * (1-phats)/n)
    ul <- phats + qnorm(.975) * sqrt(phats * (1-phats)/n)
    mean(ll < p & ul > p)
})
# If you plot this data based on the values and the confidence interval, you will see that .5 surpasses the 95% interval. 
# However, there are other values where it doesn't surpass the coverage, which means the n isn't big enough for the CLT to be applicable

# There are two options; you can either make n larger, or us the Agresti/Coull interval, which is: 
# Adding two success and failures, (X + 2)/(n + 4) (this is adding two success, and 4 instances)

coverage2 <- sapply(pvals, function(p){
    phats <- (rbinom(nosim, prob = p, size = n) + 2)/(n + 4)
    ll <- phats - qnorm(.975) * sqrt(phats * (1-phats)/n)
    ul <- phats + qnorm(.975) * sqrt(phats * (1-phats)/n)
    mean(ll < p & ul > p)
})
```

### Poisson Interval example 

A nuclear pump failed five times out of 94.32 days. What is the 95% confidence interval for the failure rate per day?

* X~Poisson(λt)
* Estimate λ-hat=X/t
* Var(λ-hat)=λ/t 
* λ-hat/t is our variance estimate 

Here is the R code that answers the question:

```{r confP}
x <- 5
t <- 94.32
lambda <- x/t 
round(lambda + c(-1, 1) * qnorm(.975) * sqrt(lambda/t), 3) # estimate
poisson.test(x, T = 94.32)$conf # exact using poisson test

# Now, let's see how these intervals perform coverage wise 

lambdavals <- seq(0.005, 0.1, by = 0.01)
nosim <- 100
t <- 100
coverage <- sapply(lambdavals, function(lambda) {
    lhats <- rpois(nosim, lambda = lambda *t)
    ll <- lhats - qnorm(0.975) * sqrt(lhats/t)
    ul <- lhats + qnorm(0.975) * sqrt(lhats/t)
    mean(ll < lambda & ul > lambda)
})

# Gets really bad for small values of lambda, if charted
```