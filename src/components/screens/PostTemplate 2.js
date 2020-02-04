import React, { Component } from 'react'

export default class PostTemplate extends Component {
    render() {
        const { slug } = this.props.pageContext

    try {
      const response = await fetch(`/comment/${slug}`)
      const comments = await response.json()

      this.setState({ comments })
    } catch (error) {
      this.setState({ error: true })
    }

        return (
            <div>
                {!error && <Comments commentsList={comments} slug={slug} />}
            </div>
        )
    }
}